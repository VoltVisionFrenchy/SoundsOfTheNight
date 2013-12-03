var spawn = require('child_process').spawn;
bbb = require('bonescript');
bbb.pinMode('P9_42', bbb.OUTPUT);

var Sound = function (config) {
	config = config || {};

	this.path = config.path;
	this.mockPlay = config.mockPlay;
};

Sound.prototype.play = function() {
	if(this.mockPlay !== true){
//		play = spawn('play', ['-q', this.path]);
		play = spawn('aplay', ['-q', '/home/root/audio/fox2-short.wav']);
          	console.log('Playing!!!!!', this.path);
		bbb.digitalWrite('P9_42', bbb.HIGH);

		play.stdout.on('data', function (data) {
			console.log('stdout: ' + data);
		});


		play.on('close', function (code) {
			console.log('child process exited with code ' + code);
			bbb.digitalWrite('P9_42', bbb.LOW);
		});

		if (process.pid) {
  			console.log('Process.pid: ' + process.pid);
		}
		console.log('process.platform: ' + process.platform);
                console.log('process.title: ' + process.title);
    }else{
		console.log('mockPlay', this.path);
	}
};

module.exports = Sound;
