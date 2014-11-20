'use strict';

var path   = require('path');
var Sensor = require('./lib/sensor');
var Player = require('./lib/player');

//
// Create the Sensor object
//
// If you want to override default properties uncomment it below 
// on the object initialization
// Properties
//   threshold {number} - Sensor threshold - default: 0.9
//   intervalRate {number} - Sensor reading rate in ms - default: 10
//   pin {string} - BeagleBone Black Pin - default: 'P9_39'
//   mock {boolean} - execute on testing environment
//
var sensor = new Sensor({
  threshold : 0.47,
  intervalRate : 10,
  // pin: 'P9_37',
  mock: process.env.MOCK
});


//
// Create the player Object
//
// If you want to override default properties uncomment it below 
// on the object initialization
// Properties
//   soundsDir {string} - folder with the sounds - default `sounds`
//   pin {string} - BeagleBone Black Pin  default: 'P9_42'
//   mock {boolean} - execute on testing environment
var player = new Player({
  soundsDir: path.join(__dirname, 'sounds'),
  // pin: 'P8_8',
  mock: process.env.MOCK
});

//
// Start the sensor readings
//
sensor.start();

sensor.on('threshold:over', function (data) {
  console.log('threshold over', data);
});

sensor.on('threshold:under', function (data) {
  console.log('threshold under', data);
  player.play();
});

console.log('Sensor running');
