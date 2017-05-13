function Partikel(n, v, r) {
  // Particles consist of:
  // - number
  // - vector (position)
  // - radius (dimension)
  this.num = n;
  this.pos = v;
  this.r = r
  this.dir = v.normalize();
  this.rings = 5; // benutzt um zusätziche ringe um die Partikel zu zeichnen.


  // can we have some effect on the host besides a circle?
  // test something else
  var circle = {
    radius: 2,
    max_radius: this.r,
    opacity: 255
  };
      

  this.repraesentieren = function(option) {
    if (option) {
      push();
      stroke(200, 180, 0, 150);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
      // var radius = r;
      // for (var i = 0; i < 6; i++) {
      //   radius += 6;
      // }
      pop();

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
      point(this.pos.x, this.pos.y)
      push();
      strokeWeight(1);
      stroke(255, 255, 255, 75);
      var next = world.particles[(this.num + 1) % world.particles.length]
      line(this.pos.x, this.pos.y, next.pos.x, next.pos.y);
 
      // Partikel-Ring "multiplizieren"
      var new_vector = createVector(this.pos.x, this.pos.y);
      var new_next_vector = createVector(next.pos.x, next.pos.y);
      var cur_length = new_vector.mag();
      var next_length = new_next_vector.mag();
      new_vector.setMag(cur_length * 1.025);
      new_next_vector.setMag(next_length * 1.025);
      for (var i = 0; i < this.rings; i++) {
        line(new_vector.x, new_vector.y, new_next_vector.x, new_next_vector.y)
        cur_length = new_vector.mag();
        next_length = new_next_vector.mag();
        new_vector.setMag(cur_length * 1.025);
        new_next_vector.setMag(next_length * 1.025);

      }
      pop();

    }
  };
}
