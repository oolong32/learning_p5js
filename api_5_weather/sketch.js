var weather;

var apiCall = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var apiKey = '&APPID=c4ea18ae0fc12698113daea23e46ef6c';
var units = '&units=metric';

var input;

function setup() {
	createCanvas(400, 200);
	var button = select('#submit');
	button.mousePressed(askWeather);
  
	input = select('#city');
}

function askWeather() {
	var url = apiCall + input.value() + apiKey + units;
	loadJSON(url, weatherDataLoaded);
}

function weatherDataLoaded(data) {
	console.log(data);
	weather = data;
}

function draw() {
  
}
