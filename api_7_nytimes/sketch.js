var url1 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
var keyword = 'boardgame';
var url2 = '&api-key=125c9c4ee025606eee21e54b9a93bf8f%3A0%3A61503000';

function setup() {
	noCanvas();
	createInput('');
	createButton('Look it up!');
	loadJSON(url1 + keyword + url2, gotData);
}

function gotData(data) {
	var articles = data.response.docs;
	var nyt_link = '';
	for (var i = 0; i < articles.length; i++) {
		createElement('h2', articles[i].headline.main);
		snippet = createP(articles[i].snippet);
		nyt_link = articles[i].web_url;
		createP('<a href="' + nyt_link + '">' + 'Read the full story.</a>');
	}
}
