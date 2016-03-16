var w;

function Walker() {
	this.position = createVector(width/2, height/2);
	this.velocity = createVector();
	this.acceleration = createVector(-0.001, 0.01);
	this.topspeed = 5;

	this.move = function() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.topspeed);
		this.position.add(this.velocity);
	};

	this.display = function() {
		noStroke();
		fill(255); 
		ellipse(this.position.x, this.position.y, 25, 25);
	};
	this.checkEdges = function() {
		if (this.position.x > width) {
			this.position.x = 0;
		} else if (this.position.x < 0) {
			this.position.x = width;
		}
		if (this.position.y > height) {
			this.position.y = 0;
		} else if (this.position.y < 0) {
			this.position.y = height;
		}
	}
}

function setup() {
	createCanvas(400, 500);
	w = new Walker();
}

function draw() {
	background(0);
	w.move();
	w.checkEdges();
	w.display(); 
}
