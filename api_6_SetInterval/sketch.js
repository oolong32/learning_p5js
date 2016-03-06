var lineX = 0;
var url = 'http://api.open-notify.org/iss-now.json';
var issX;
var issY;
var p_lat;
var p_lon;

function setup() {
	createCanvas(600, 400);
	setInterval(queryLocation, 1000);
	p_lat = createP('…');
	p_lat.class('lat');
	p_lon = createP('…');
	p_lon.class('lon');
}

function queryLocation() {
	loadJSON(url, gotLocation, 'jsonp'); 
}

function gotLocation(data) {
	//console.log(data);

	var lat = data.iss_position.latitude;
	var lon = data.iss_position.longitude;
	issX = map(lat, -90, 90, 0, width);
	issY = map(lat, -90, 90, 0, height);

}

function draw() {
	background(51);

	if (gotLocation) {
		noStroke();
		fill(255, 60, 0);
		ellipse(issX, issY, 6, 6);
		text('ISS', issX + 4, issY - 4);
		if (issX && issY) {
			p_lat.html('Latitude: ' + issX);
			p_lon.html('Longitude: ' + issY);
		}
	}
  
	/*
	stroke(255);
	line(lineX, 0, lineX, height);
	lineX += 5;
	if (lineX > width) {
		lineX = 0;
	}
 */
}
