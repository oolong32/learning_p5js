console.log('follow-bot starting …');

var Twit = require('twit');

var config = require('./config');
var exec = require('child_process').exec;
var fs = require('fs');
var T = new Twit(config);

// Set up user stream
var stream = T.stream('user');

// Anytime someone follows me
// Instead of 'follow' there are other events that could be queried.
// (see Twitter api)
stream.on('follow', followed);

function followed(eventMsg) {
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('oh, hi @' + screenName + ' — thank you so much for following me!');
}

setInterval(tweetIt, 1000*60*60);

function tweetIt(txt) {
		if (txt) {
		 	var tweet = {status: txt};
		} else {
			//var r = Math.floor(Math.random()*100);
			//var tweet = {status: 'Nr. ' + r};
			var cmd = 'phantomjs fantom.js';
			exec(cmd, upload_img);

			function upload_img() {
				var filename = 'example.png'
				var params = {
					encoding: 'base64'
				};
				var b64content = fs.readFileSync(filename, params);
				// Next ist just upload, not tweeting yet.
				T.post('media/upload', { media_data: b64content }, uploaded);

				function uploaded(err, data, response) {
					if (err) {
						console.log('something went wrong with the upload :-(');
					} else {
						// Actual Tweet happening here.
						var id = data.media_id_string;
						var tweet = {
							status: 'Ain’t I a #happybot? I have a picture!',
							media_ids: [id]
						};
						T.post('statuses/update', tweet, tweeted);
					}
				}
			}
	}

	function tweeted(err, data, response) {
		if (err) {
			console.log('something went wrong!');
			// console.log(err);
		} else {
			//console.log('posted: «' + data.status + '»');
			console.log('it might have worked');
		}
	};
} 
