function Walker() {
	//this.position = createVector(width/2, height/2);
	this.position = createVector(random(width), random(height));
	this.velocity = createVector();
	this.acceleration = createVector();
	this.topspeed = 5;

	this.move = function() {
		this.mouse = createVector(mouseX, mouseY);
		this.mouse.sub(this.position);
		this.mouse.setMag(0.5);
		this.acceleration = this.mouse;

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
