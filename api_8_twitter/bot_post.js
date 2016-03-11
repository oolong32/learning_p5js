console.log('starting …');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

var tweet = {
	status: 'hello world!'
}

function tweeted(err, data, response) {
	if (err) {
		console.log('something went wrong!');
	} else {
		console.log('posted: «' + tweet.status + '»');
	}
};

T.post('statuses/update', tweet, tweeted()); 
