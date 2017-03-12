function Boundary(x, y, w, h, angle) {
  var options = {
    isStatic: true,
    angle: angle
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  World.add(world, this.body);

  this.show = function() {
    fill(120);
    noStroke();
    rectMode(CENTER);
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    rect(0, 0, w, h);
    pop();
  }
}
