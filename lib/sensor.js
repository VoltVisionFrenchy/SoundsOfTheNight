'use strict';

var EventEmitter = require('events').EventEmitter;
var bbb;

function Sensor(config) {
  config = config || {};

  this.threshold = config.threshold || 0.9;
  this.ee = new EventEmitter();

  this.value = 0;
  this.state = null;
  this.mock = config.mock;
  this.intervalRate = config.intervalRate || 10;
  this.pin = config.pin || 'P9_39';

  if (!this.mock) {
    bbb = require('bonescript');
  }
}

Sensor.prototype.start = function start() {

  var readHandler = function (value) {
    if(value > this.threshold && this.state !== 'over'){
      this.ee.emit('threshold:over', value);
      this.state = 'over';
    }

    if(value < this.threshold && this.state !== 'under'){
      this.ee.emit('threshold:under', value);
      this.state = 'under';
    }
  }.bind(this);

  this.interval = setInterval(function interval() {
    this.read(readHandler);
  }.bind(this), this.intervalRate);
};

Sensor.prototype.on = function onListener(event, fn) {
  this.ee.on(event, fn);
};

Sensor.prototype.read = function read(callback) {
  if (this.mock) {
    callback(Math.random());
  } else {
    bbb.analogRead(this.config.pin, function (x) {
      callback(x.value);
    });
  }
};

module.exports = Sensor;
