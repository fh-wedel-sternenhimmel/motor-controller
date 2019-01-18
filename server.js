var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jsonfile = require('jsonfile')

var i2c = require('i2c-bus');
var Gpio = require('onoff').Gpio;
var Expander = require('./modules/Expander');
var Driver = require('./modules/Driver');
var Motor = require('./modules/Motor');

// Motoren initialisieren
var slp = new Gpio(17, 'out');
var i2c1 = i2c.openSync(1);
var expander1 = new Expander(i2c1, 0x26);
var expander2 = new Expander(i2c1, 0x27);
var motors = [
    new Motor(expander1, 'b3', 'b2'),
    new Motor(expander1, 'b1', 'b0'),
    new Motor(expander1, 'a7', 'a6'),
    new Motor(expander1, 'a5', 'a4'),
    new Motor(expander1, 'b5', 'b4'),
    new Motor(expander1, 'b7', 'b6'),
    new Motor(expander1, 'a1', 'a0'),
    new Motor(expander1, 'a3', 'a2'),

    new Motor(expander2, 'a3', 'a2'),
    new Motor(expander2, 'a1', 'a0'),
    new Motor(expander2, 'b7', 'b6'),
    new Motor(expander2, 'b5', 'b4'),
    new Motor(expander2, 'a5', 'a4'),
    new Motor(expander2, 'a7', 'a6'),
    new Motor(expander2, 'b1', 'b0'),
    new Motor(expander2, 'b3', 'b2'),
];
var driver = new Driver(motors, slp);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

Array.prototype.toObj = function() {
    var ret = {};
    this.forEach((m, i) => ret[i+1] = m);
    return ret;
};

// Positionen und Zielpositionen im browser aktualisieren
setInterval(function() {
    io.emit('update_pos', motors.map(m => m.getPosition()).toObj());
    io.emit('update_target', motors.map(m => m.getTarget()).toObj());
}, 100);

// "Wabern"
var dither = false;
var ditherf = function() {
    if(dither) {
        motors
            .filter(() => Math.random() > 0.7)
            .forEach((m) => m.dither());
    }
    setTimeout(ditherf, Math.floor(Math.random() * 4000) + 2000)
}
ditherf();

io.on('connection', function(socket) {
    console.log('a user connected');

    // Positionen in Schritten
    socket.on('update_target_manual', function(val) {
        console.log('update_target_manual', val);
        motors[val.motor-1].moveTo(val.tar);
    });

    // Position in CM
    socket.on('update_target_cm', function(val) {
        console.log('update_target_cm', val);
        motors[val.motor-1].moveTo(val.tar, true);
    });

    // Liste von Positionen in CM
    var previous = [];
    socket.on('update_targets_cm', function(val) {
        console.log('update_targets_cm', val);

        // Zurücksetzten
        var diff = previous.filter(m => !val.some(v => m.motor == v.motor));
        console.log('diff', diff);
        for (var i = 0; i < diff.length; i++) {
            motors[diff[i].motor].moveBack();
        }
        previous = val;

        val.forEach(m => motors[m.motor].moveToAndSave(m.tar, true));
    });

    // Zufällige Positionen
    socket.on('randomize_manual', function(val) {
        console.log('randomize_manual');
        motors.forEach(m => m.moveToRandom());
    });

    // "Wabern" ein/aus
    socket.on('dither_manual', function(val) {
        console.log('dither_manual');
        dither = !dither;
    });

    // Positionen auf 0 setzten
    socket.on('reset_manual', function(val) {
        console.log('reset_manual');
        motors.forEach(m => m.reset());
    });

    // Ausschalten
    socket.on('shutdown_manual', function(val) {
        console.log('shutdown_manual');
        var exec = require('child_process').exec;
        exec('shutdown now');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

// Positionen beim Starten einlesen und regelmäßig und beim Ausschalten speichern
var file = "./config.json";
var pos = motors.map(() => 0);
try {
    pos = jsonfile.readFileSync(file);
} catch(err) {
    jsonfile.writeFileSync(file, pos);
}
pos.forEach((p, m) => motors[m].setPosition(p, true));
setInterval(function() {
    jsonfile.writeFileSync(file, motors.map(m => m.getPosition()));
}, 1000 * 10);

function exitHandler(options, exitCode) {
    jsonfile.writeFileSync(file, motors.map(m => m.getPosition()));
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

process.stdin.resume();//so the program will not close instantly

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
