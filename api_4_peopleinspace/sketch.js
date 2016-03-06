var spaceData;

function setup() {
	createCanvas(300, 200);
	loadJSON("http://api.open-notify.org/astros.json", gotData, 'jsonp');
	textFont('Univers LT Std');
}

function gotData(data) {
	spaceData = data;
}

function draw() {
	background(0);
	if (spaceData) {
		randomSeed(2);
		for (var i = 0; i < spaceData.number; i++) {
			fill(255);
			var x = random(width);
			var y = random(height);
			ellipse(x, y, 16, 16)
			fill(250, 30, 0);
			text(spaceData.people[i].name, x + 8, y - 4)
		}
	}
  
}
