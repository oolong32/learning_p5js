var m;

function setup() {
	createCanvas(400, 500);
	m = new Mover();
}

function draw() {
	background(0);

	var f = createVector(0, 0.1);	
	m.applyForce(f);

	m.update();
	m.edges();
	m.display(); 
}

function mousePressed() {
		f = createVector(0.2, 0);	
		m.applyForce(f);
}
