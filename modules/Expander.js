/**
 * Expander.
 */
class Expander {
    /**
     * Konstruktor.
     * @param {*} i2c I2C-Bus-Instanz.
     * @param {*} address Adresse des Expander.
     */
    constructor(i2c, address) {
        this.IODIRA = 0x00;
        this.IODIRB = 0x01;
        this.OLATA = 0x14;
        this.OLATB = 0x15;

        this.i2c = i2c;
        this.address = address;

        this.state = {
            iodira: 0x00,
            iodirb: 0x00,
            olata: 0x00,
            olatb: 0x00,
        };

        this.dirty = {
            olata: false,
            olatb: false,
        };

        this.init();
    }

    /**
     * Initiales schreiben (alle Ports 0).
     */
    init() {
        this.i2c.writeByteSync(this.address, this.IODIRA, this.state.iodira);
        this.i2c.writeByteSync(this.address, this.IODIRB, this.state.iodirb);
        this.i2c.writeByteSync(this.address, this.OLATA, this.state.olata);
        this.i2c.writeByteSync(this.address, this.OLATB, this.state.olatb);
    }

    /**
     * Einen bestimmten Port für einen bestimmten Zustand vormerken.
     * @param {*} port Port.
     * @param {*} state Zustand.
     */
    set(port, state) {
        let p = {
            a0: [this.OLATA, 0x01],
            a1: [this.OLATA, 0x02],
            a2: [this.OLATA, 0x04],
            a3: [this.OLATA, 0x08],
            a4: [this.OLATA, 0x10],
            a5: [this.OLATA, 0x20],
            a6: [this.OLATA, 0x40],
            a7: [this.OLATA, 0x80],

            b0: [this.OLATB, 0x01],
            b1: [this.OLATB, 0x02],
            b2: [this.OLATB, 0x04],
            b3: [this.OLATB, 0x08],
            b4: [this.OLATB, 0x10],
            b5: [this.OLATB, 0x20],
            b6: [this.OLATB, 0x40],
            b7: [this.OLATB, 0x80],
        }

        // Seite A
        if(p[port][0] == this.OLATA) {
            let oldState = this.state.olata;
            this.state.olata = state
                ? this.state.olata | p[port][1]
                : this.state.olata & (~ p[port][1]);
            if(oldState != this.state.olata) this.dirty.olata = true;
        // Seite B
        } else if(p[port][0] == this.OLATB) {
            let oldState = this.state.olatb;
            this.state.olatb = state
                ? this.state.olatb | p[port][1]
                : this.state.olatb & (~ p[port][1]);
            if(oldState != this.state.olatb) this.dirty.olatb = true;
        }
    }

    /**
     * Zustandsänderungen auf den Expander schreiben.
     */
    write() {
        // Seite A
        if(this.dirty.olata) {
            this.i2c.writeByteSync(this.address, this.OLATA, this.state.olata);
            this.dirty.olata = false;
        }
        // Seite B
        if(this.dirty.olatb) {
            this.i2c.writeByteSync(this.address, this.OLATB, this.state.olatb);
            this.dirty.olatb = false;
        }
    }
}

module.exports = Expander;
