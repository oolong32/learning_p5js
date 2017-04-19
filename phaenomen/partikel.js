function Partikel(n, v, r) {
  // Particles consist of:
  // - number
  // - vector (position)
  // - radius (dimension)
  this.num = n;
  this.pos = v;
  this.r = r

  this.repraesentieren = function(option) {
    if (option) {
      push();
      stroke(0, 180, 255);
      ellipse(this.pos.x, this.pos.y, r, r);
      pop();
    } else {
      point(this.pos.x, this.pos.y)
    }
  };
}
