function Planet(r, d, a, o) {
  this.radius = r;
  this.angle = a;
  this.distance = d;
  this.planets = [];
  this.orbitspeed = o;

  this.show = function() {
    push();
    rotate(this.angle);
    translate(this.distance, 0);
    noStroke();
    fill(255, 0, 120);
    ellipse(0, 0, this.radius * 2, this.radius * 2);
    pop();
    // push()
    // noFill();
    // stroke(255);
    // if (this.planets.length > 0) {
    //   for (var i = 0; i < this.planets.length; i++) {
    //     ellipse(0, 0, this.planets[i].distance, this.planets[i].distance);
    //   } 
    // }
    // pop()
    if (this.planets.length > 0) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
    }
  };

  this.orbit = function() {
    this.angle = this.angle + this.orbitspeed;
    if (this.planets.length > 0) {
      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].orbit();
      }
    }
  };

  this.spawnMoons = function(total) {
    for (var i = 0; i < total; i++) {
      var nr = this.radius * 0.5;
      var rd = random(50, 250);
      var ra = random(0, Math.PI*2);
      this.planets.push(new Planet(nr, rd, ra, random(0.01, 0.03)));
    }
  };
}
