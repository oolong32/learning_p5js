function Partikel(n, v, r) {
  // Particles consist of:
  // - number
  // - vector (position)
  // - radius (dimension)
  this.num = n;
  this.pos = v;
  this.r = r
  this.dir = v.normalize();
  this.feeler = new Feeler();


  this.repraesentieren = function(option) {
    if (option) {
      push();
      stroke(0, 180, 255);
      ellipse(this.pos.x, this.pos.y, r, r);
      pop();

      // add some arbitrary stuff, gäll
      // e.g. feelers
      push();
      stroke(180, 200, 0);
      if (!this.feeler.ready && this.feeler.whatTimeIsIt() > 2) {
        this.feeler.ready = true;
        // console.log("feeler ready");
      }
      if (this.feeler.ready) {
        this.feeler.addSegment(this.pos.x, this.pos.y);
        this.feeler.update();

        // display Feeler. We’ll do it right here, what
        // because we need the particle’s origin as a starting point
        // this is messy, the feeler segments are connected to polygons elsewhere:
        var transp = 255;
        beginShape();
        strokeWeight(1);
        var origin = createVector(this.pos.x, this.pos.y);
        vertex(origin.x, origin.y);
        if (this.feeler.segments.length > 0) {
          for (var i = 0; i < this.feeler.segments.length; i++) {
            stroke(180, 200, 0, transp);
            var next_vector = origin.add(this.feeler.segments[i]);
            vertex(next_vector.x, next_vector.y);
            transp -= 255/this.feeler.number_of_segments;
          }
        }
        endShape(); 
      }
      
      // line(this.pos.x, this.pos.y, this.feeler.pos.x, this.feeler.pos.y);
      // ellipse(this.feeler.pos.x, this.feeler.pos.y, 4, 4);
      pop();
    } else {
      point(this.pos.x, this.pos.y)
    }
  };
}
