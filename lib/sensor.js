var bbb;
var EventEmitter = require('events').EventEmitter;

var Sensor = function (config) {
	this.threshold = config.threshold || 0.9;
	this.ee = new EventEmitter();

	config = config || {};

	this.value = 0;
	this.state = null;
	this.mockRead = config.mockRead;
	this.intervalRate = config.intervalRate || 10;
	
	if(this.mockRead !== true){
		bbb = require('bonescript');
	}
};

Sensor.prototype.start = function() {
	var self = this;

	var readHandler = function (value) {
		if(value > self.threshold && self.state !== "over"){
			self.ee.emit('threshold:over', value);
			self.state = "over";
		}

		if(value < self.threshold && self.state !== "under"){
			self.ee.emit('threshold:under', value);
			self.state = "under";
		}
	};

	this.interval = setInterval(function () {
		self.read(readHandler);
	},this.intervalRate);
};

Sensor.prototype.on = function(event,fn) {
	this.ee.on(event,fn);
};

Sensor.prototype.read = function(callback) {
	if(this.mockRead === true){
		process.nextTick(function () {
			callback(Math.random());
		});
	}else{
		bbb.analogRead('P9_36', function (x) {
			callback(x.value);
		});
	}
};

module.exports = Sensor;
