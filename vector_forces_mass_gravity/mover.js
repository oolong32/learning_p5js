function Mover() {
  //this.position = createVector(width/2, height/2);
	this.position = createVector(400, 50);
  this.mass = 1;
  this.radius = this.mass * 2;
	this.velocity = createVector(1, 0);
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
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);};

	this.edges = function() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  };

}
