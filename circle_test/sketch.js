var radius = 100;
var angle, point_x, point_y;

function setup() {
	createCanvas(400, 400);
	frameRate(5);
}

function draw() {
	for (var i = 0; i < 100; i++) {
		background(0);
		angle = (i / 100) * 2 * Math.PI;
		point_x = Math.cos(angle) * radius;
		point_y = Math.sin(angle) * radius;

		stroke(255);
		noFill();
		ellipse(width/2, height/2, radius * 2, radius * 2);
		
		translate(width/2, height/2);
		noStroke();
		fill(255, 0, 0);
		ellipse(point_x, point_y, 20, 20);
		translate(-1 * width/2, -1 * height/2);
	}
}
