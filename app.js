var Sensor = require('./lib/sensor'),
	Sound = require('./lib/sound');

var sensor = new Sensor({
	threshold : 0.47,
	intervalRate : 10
});

var loop = new Sound({
	path : "./sounds/loop.wav"
});

sensor.start();

sensor.on('threshold:over', function (data) {
	console.log('threshold over', data);
});

sensor.on('threshold:under', function (data) {
	console.log('threshold under', data);
	loop.play();
});


console.log('Sensor running');
