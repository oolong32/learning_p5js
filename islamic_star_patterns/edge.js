function Edge(a, b) {
  this.a = a;
  this.b = b;
  this.h1;
  this.h2;
  
  this.show = function() {
    stroke(0, 255, 0);
    // check grid
    // line(this.a.x, this.a.y, this.b.x, this.b.y);
    this.h1.show();
    this.h2.show();
  }
  
  this.hankin = function(alpha) {
    var mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);
    
    var v1 = p5.Vector.sub(this.a, mid);
    var v2 = p5.Vector.sub(this.b, mid);
    
    // Edge length (needed to calculate hankin length, see below
    var elen = v1.mag() + delta;

    var offset1 = mid;
    var offset2 = mid;

    if (delta > 0) {
      v1.setMag(delta);
      v2.setMag(delta);

      offset1 = p5.Vector.add(mid, v1);
      offset2 = p5.Vector.add(mid, v2);
    }

    v1.normalize();
    v2.normalize();

    v1.rotate(radians(-angle));
    v2.rotate(radians(angle));

    // Law of sines to calculate length of hankin
    // as in addendum https://youtu.be/lobJ9gzbLo8
    var alpha = alpha * 0.5;
    var beta = PI - alpha -radians(angle);
    var hlen = sin(alpha) * (elen / sin(beta));

    v1.setMag(hlen);
    v2.setMag(hlen);

      // shit, it’s broken :-(


    this.h1 = new Hankin(offset1, v2);
    this.h2 = new Hankin(offset2, v1);

  }
}
