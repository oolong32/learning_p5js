var r = 0;
var b = 0;

function setup() {
	createCanvas(400, 300);  
	noStroke();
}

function draw() {
	background(r, 0, b);
	fill(250, 118, 222); 
	ellipse(mouseX, 150, 54, 54);
	r = map(mouseX, 0, 400, 0, 255);
	b = map(mouseX, 0, 400, 255, 0);
}
