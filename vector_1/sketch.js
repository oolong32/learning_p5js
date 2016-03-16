var b;

function Ball() {
	this.location = createVector(width/2, height/2);
	this.velocity = createVector(2.5, -2);
	this.move = function() {
		this.location = this.location.add(this.velocity);
	};
	this.bounce = function() {
		if (this.location.x > width || this.location.x < 0) {
			this.velocity.x	= this.velocity.x * -1;
		}
		if (this.location.y > height || this.location.y < 0) {
			this.velocity.y	= this.velocity.y * -1;
		}
	};
	this.display = function() {
		background(0);
		noStroke();
		fill(255); 
		ellipse(this.location.x, this.location.y, 32, 32)
	};
}

function setup() {
	createCanvas(400, 300); 
	b = new Ball();
}

function draw() {
	b.move();
	b.bounce();
	b.display();
}
