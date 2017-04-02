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
      ellipse(this.pos.x, this.pos.y, r, r);
    } else {
      point(this.pos.x, this.pos.y)
    }
  };
}
