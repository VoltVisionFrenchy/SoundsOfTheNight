var spawn = require('child_process').spawn;

var Sound = function (config) {
	config = config || {};

	this.path = config.path;
	this.mockPlay = config.mockPlay;
};

Sound.prototype.play = function() {
	if(this.mockPlay !== true){
//		play = spawn('play', ['-q', this.path]);
		play = spawn('aplay', ['-q', '/home/root/audio/wolfhowl.wav']);
          	console.log('Playing!!!!!', this.path);
    }else{
		console.log('mockPlay', this.path);
	}
};

module.exports = Sound;
