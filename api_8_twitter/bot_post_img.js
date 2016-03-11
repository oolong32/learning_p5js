console.log('follow-bot starting …');

var Twit = require('twit');

var config = require('./config');
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
	tweetIt('oh, hi @' + screenName + ' — thank you so much for following me!);
}

setInterval(tweetIt, 1000*60*12);

function tweetIt(txt) {
		if (txt) {
		 	var tweet = {status: txt};
		} else {
			var r = Math.floor(Math.random()*100);
			var tweet = {status: 'Nr. ' + r};
	}

	T.post('statuses/update', tweet, tweeted()); 

	function tweeted(err, data, response) {
		if (err) {
			console.log('something went wrong!');
			// console.log(err);
		} else {
			console.log('posted: «' + tweet.status + '»');
		}
	};
} 
