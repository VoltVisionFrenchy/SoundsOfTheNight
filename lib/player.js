"use strict";

var fs    = require('fs');
var path  = require('path');
var spawn = require('child_process').spawn;
var bbb;

function Player(config) {
  config = config || {};

  this.pin = config.pin || 'P9_42';
  this.soundsDir = config.soundsDir || path.join(__dirname, '..', 'sounds');
  this.mock = config.mock;
  this.current = 0;

  this.sounds = fs.readdirSync(this.soundsDir).filter(function (file) {
    return path.extname(file) === '.wav';
  });

  if (!this.mock) {
    bbb = require('bonescript');
    bbb.pinMode(this.pin, bbb.OUTPUT);
  }
}

Player.prototype.next = function next() {
  if (this.current >= this.sounds.length) {
    this.current = 0;
  }

  var sound = this.sounds[this.current++];
  return sound;
};

Player.prototype.play = function play() {
  var sound = this.next();

  if (!this.mock) {
    play = spawn('aplay', ['-q', sound]);
    console.log('Playing!!!!!', this.path);

    bbb.digitalWrite(this.pin, bbb.HIGH);

    play.stdout.on('data', function onData(data) {
      console.log('stdout: ' + data);
    });

    play.on('close', function onClose(code) {
      console.log('child process exited with code ' + code);
      bbb.digitalWrite(this.pin, bbb.LOW);
    });

    if (process.pid) {
      console.log('Process.pid: ' + process.pid);
    }

    console.log('process.platform: ' + process.platform);
    console.log('process.title: ' + process.title);
  } else {
    console.log('playing', sound);
  }
};

module.exports = Player;
