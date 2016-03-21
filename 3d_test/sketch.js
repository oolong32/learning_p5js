function setup() {
	createCanvas(100, 100, WEBGL);
	fill(255, 0, 0);
}

function draw() {
	background(0);
	background(200);
	rotateX(frameCount * 0.01);
	rotateY(frameCount * 0.01);
	box(200, 200, 200);
}

