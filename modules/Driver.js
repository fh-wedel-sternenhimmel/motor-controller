/**
 * Treiber.
 */
class Driver {
    /**
     * Konstruktor.
     * @param {*} motors Liste von Motoren.
     * @param {*} sleep Pin für Sleep-Funktion der Treiber.
     */
    constructor(motors, sleep) {
        this.motors = motors;
        this.sleep = sleep;
        this.sleepState = 0;

        var expander = this.motors.map(m => m.getExpander());
        this.expander = expander.filter((e, i) => expander.indexOf(e) == i);

        this.setSleep(0);
        this.tick();
    }

    /**
     * Einen Schritt druchführen, falls notwendig.
     */
    tick() {
        var mustMove = this.motors.some(m => m.mustMove());

        if(mustMove && this.sleepState == 0) {
            this.setSleep(1);
        } else if(!mustMove && this.sleepState == 1) {
            this.setSleep(0);
        } else if(!mustMove && this.sleepState == 0) {
            // nothing to do
        } else if(mustMove && this.sleepState == 1) {
            this.motors.forEach(m => m.setDir());
            
            this.motors.forEach(m => m.setStep(true));
            this.writeExpander();
            
            this.motors.forEach(m => m.setStep(false));
            this.writeExpander();
        }
        setTimeout(() => { this.tick(); }, 1);
    }

    /**
     * Sleep-Port einstellen.
     * @param {*} state Zustand.
     */
    setSleep(state) {
    	this.sleepState = state;
    	this.sleep.writeSync(this.sleepState);
    }

    /**
     * Daten an Expander senden.
     */
    writeExpander() {
        this.expander.forEach(e => e.write());
    }
}

module.exports = Driver;
