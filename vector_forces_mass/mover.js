function Mover() {
  //this.position = createVector(width/2, height/2);
	this.position = createVector(random(width), random(height));
  this.mass = random(1, 5);
	this.velocity = createVector();
	this.acceleration = createVector();
	this.topspeed = 5;

	this.update = function() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.topspeed);
		this.position.add(this.velocity);

    // reset acceleration
    this.acceleration = this.acceleration.mult(0);
	};

  this.applyForce = function(f) {
    // divide force by mass
    var nf = p5.Vector.div(f, this.mass);
    this.acceleration.add(nf);
  }

	this.display = function() {
		noStroke();
		fill(255); 
		ellipse(this.position.x, this.position.y, this.mass*5, this.mass*5);
	};

	this.edges = function() {
		if (this.position.x > width || this.position.x < 0) {
			this.velocity.x	= this.velocity.x * -1;
		}
		if (this.position.y > height || this.position.y < 0) {
			this.velocity.y	= this.velocity.y * -1;
		}
	};

}
