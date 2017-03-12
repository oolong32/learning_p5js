function Circle(x, y, r) {
  var options = {
    friction: 0.1,
    restitution: 0.2
  }

  this.body = Bodies.circle(x, y, r, options);
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    strokeWeight(1);
    stroke(255);
    fill(100, 80, 120);
    ellipse(0, 0, r*2, r*2);
    pop();
  }
  
  this.isOffScreen = function() {
    return this.body.position.y >= height + this.body.circleRadius;
  };

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  };

}
