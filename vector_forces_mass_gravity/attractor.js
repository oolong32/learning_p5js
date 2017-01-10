function Attractor() {
  this.position = createVector(width/2, height/2);
  this.mass = 20;
  this.G = 1; // gravity constant, made up arbitrarily
  this.radius = this.mass * 2;
  this.dragOffset = createVector(0, 0);
  this.dragging = false;
  this.rollover = false;

  this.attract = function(m) {
    // subtract mover from attractor to get vector pointing at attractor
    var force = p5.Vector.sub(this.position, m.position);
    var d = force.mag(); // distance from mover to attractor
    d = constrain(d, 5, 25); // constrain because measuring the distance in pixels is no good

    // direction of the force
    force.normalize();
    
    // magnitude of the force
    var strength = (this.G*this.mass*m.mass) / (d*d);

    // force of attraction
    force.mult(strength);

    return force;
    
  }

	this.display = function() {
    ellipseMode(CENTER);
    strokeWeight(4);
    stroke(0);
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    ellipse(this.position.x, this.position.y, this.mass*2, this.mass*2);};

  // The methods below are for mouse interaction
  this.handlePress = function(mx, my) {
    var d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  };

  this.handleHover = function(mx, my) {
    var d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  };

  this.stopDragging = function() {
    this.dragging = false;
  };

  this.handleDrag = function(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  };
}
