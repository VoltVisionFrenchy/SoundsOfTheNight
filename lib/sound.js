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

		play.stdout.on('data', function (data) {
			console.log('stdout: ' + data);
		});


		play.on('close', function (code) {
			console.log('child process exited with code ' + code);
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
