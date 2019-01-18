/**
 * Representiert einen Motor auf dem Modul.
 */
class Motor {
    /**
     * Konstruktor.
     * @param {Expander} expander Expander
     * @param {*} step Adresse des Step-Pin
     * @param {*} dir Adresse des Dir-Pin
     */
    constructor(expander, step, dir) {
        this.expander = expander;
        this.step = step;
        this.dir = dir;

        this.direction = null;
        this.position = 0;
        this.target = 0;
        this.previousTarget = null;
    }

    /**
     * Zufällige Position in bestimmten Bereich.
     */
    getRandomPosition() {
        return Math.floor(Math.random() * 2000) + 1200;
    }

    /**
     * Position überschreiben.
     * @param {*} position Neue Position.
     * @param {*} sameTarget Zielposition auch überschreiben?
     */
    setPosition(position, sameTarget = false) {
        this.position = position;
        if(sameTarget) this.target = position;
    }

    /**
     * Position auf 0 setzten.
     */
    reset() {
        this.setPosition(0, true);
    }

    /**
     * Auf zufällige Position bewegen.
     */
    moveToRandom() {
        this.moveTo(this.getRandomPosition());
    }

    /**
     * "Wabern".
     */
    dither() {
        if(this.previousTarget !== null) {
            this.previousTarget = this.getRandomPosition();
        } else {
            this.target = this.getRandomPosition();
        }
    }

    /**
     * Auf Position bewegen.
     * @param {*} target Zielposition.
     * @param {*} isCM Zielposition umrechen von CM auf Schritten.
     */
    moveTo(target, isCM = false) {
        if(isCM) {
            target = Math.floor((target - 40) * 71.4285714286);
            target = Math.min(Math.max(200, target), 10000);
            target = Math.max(1000, target);
        }
        this.target = target;
    }

    /**
     * Auf Position bewegen, alte Position speichern.
     * @param {*} target Zielposition.
     * @param {*} isCM Zielposition umrechen von CM auf Schritten.
     */
    moveToAndSave(target, isCM = false) {
        if(this.previousTarget === null) {
            this.previousTarget = this.target;
        }
        this.moveTo(target, isCM);
    }

    /**
     * Auf vorher gespeciherte Position zurück bewegen.
     */
    moveBack() {
        if(this.previousTarget !== null) {
            this.moveTo(this.previousTarget);
            this.previousTarget = null;
        }
    }

    /**
     * Ist eine Bewegung notwenig (Ziel != Pos)? 
     */
    mustMove() {
        return this.position != this.target;
    }

    /**
     * Richtung einstellen.
     */
    setDir() {
        if(this.mustMove()) {
            this.direction = this.position < this.target;
            this.expander.set(this.dir, this.direction);
        }
    }

    /**
     * Step durchführen.
     * @param {*} state Zustand (0/1)
     */
    setStep(state) {
        if(this.mustMove()) {
            this.expander.set(this.step, state);
            if(state == false) this.position += this.direction ? 1 : -1;
        }
    }

    getExpander() {
        return this.expander;
    }

    getPosition() {
        return this.position;
    }

    getTarget() {
        return this.target;
    }
}

module.exports = Motor;
