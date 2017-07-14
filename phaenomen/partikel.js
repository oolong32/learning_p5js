function Partikel(n, v, r) {
  // Particles consist of:
  // - number
  // - vector (position)
  // - radius (dimension)
  this.num = n;
  this.pos = v;
  this.r = r
  this.dir = v.normalize();
  this.rings = (segment_slider) ? segment_slider.value() : 0; // benutzt um zusätziche ringe um die Partikel zu zeichnen.
  this.ring_distance = 1.025;
  this.ring_color = (ring_color_slider) ? ring_color_slider.value() : 0;


  // can we have some effect on the host besides a circle?
  // test something else
  var circle = {
    radius: 2,
    max_radius: this.r,
    opacity: 255
  };
      

  this.display = function(option) {
    if (option) {
      // push();
      // stroke(200, 180, 0, 150);
      // stroke(0, 80);
      // fill(0, random(20, 45));
      // ellipse(this.pos.x, this.pos.y, this.r, this.r);
      // var radius = r;
      // for (var i = 0; i < 6; i++) {
      //   radius += 6;
      // }
      // pop();

//       push();
//       stroke(200, 180, 0, circle.opacity);
//       ellipse(this.pos.x, this.pos.y, circle.radius, circle.radius);
//       ellipse(this.pos.x, this.pos.y, 0.6*circle.radius, 0.6*circle.radius);
//       ellipse(this.pos.x, this.pos.y, 1.4*circle.radius, 1.4*circle.radius);
//       if (circle.radius < circle.max_radius) {
//         circle.radius += 0.1;
//         circle.opacity -= 255/(10*(circle.max_radius - 2));
//       } else {
//         circle.radius = 2;
//         circle.opacity = 255;
//       }
//       pop();



    } else {
      push();
      strokeWeight(1)
      point(this.pos.x, this.pos.y)
      pop();
      /*
      push();
      strokeWeight(1);
      var b = 0;
      // saturation 100% = farbe sichtbar
      var c = color('hsba(' + this.ring_color + ', 0%, ' + b + '%, 1)');
      stroke(c);
      var next = world.particles[(this.num + 1) % world.particles.length]
      line(this.pos.x, this.pos.y, next.pos.x, next.pos.y);
 
      // Partikel-Ring "multiplizieren"
      var new_vector = createVector(this.pos.x, this.pos.y);
      var new_next_vector = createVector(next.pos.x, next.pos.y);
      var cur_length = new_vector.mag();
      var next_length = new_next_vector.mag();
      new_vector.setMag(cur_length * this.ring_distance);
      new_next_vector.setMag(next_length * this.ring_distance);
      for (var i = 0; i < this.rings; i++) {
        c = color('hsba(' + this.ring_color + ', 0%, ' + b + '%, 1)');
        stroke(c);
        line(new_vector.x, new_vector.y, new_next_vector.x, new_next_vector.y);
        cur_length = new_vector.mag();
        next_length = new_next_vector.mag();
        new_vector.setMag(cur_length * this.ring_distance);
        new_next_vector.setMag(next_length * this.ring_distance);
        b += int(100/this.rings);
      }
      pop();
      */

    }
  };
}
