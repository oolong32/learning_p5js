function Hankin(a, v) { // a = starting point, v = direction
  this.a = a;
  this.v = v;
  this.b = p5.Vector.add(a, v);

  this.show = function() {
    stroke(255);
    line(this.a.x, this.a.y,this.b.x, this.b.y);
  }
}
