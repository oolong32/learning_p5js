var x;
var y;
var r;
var col;

function setup() {
	createCanvas(400, 600);
	background(20);
	for (var i = 0; i < 7000; i++) {
		x = random(0, width);
		y = random(0, height);
		r = random(10, 20);
		col = color(random(80, 230), random(10, 155), random(100, 255));
		noStroke();
		fill(col);
		ellipse(x, y, r, r);
		//saveCanvas('myCanvas', 'jpg');
	} 
}

function draw() { 
}
