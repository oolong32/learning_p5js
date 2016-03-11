console.log('starting …');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

setInterval(tweetIt, 1000*20);

function tweetIt() {
	var r = Math.floor(Math.random()*100);
	var tweet = {
		status: 'Random-Nr. ' + r + ' #codingrainbow, #unicorn and #porcupine!'
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
