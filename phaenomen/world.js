function World(particles, phenomena) {
  this.num_particles = particles;
  this.num_phenomena = phenomena;
  this.particles = [];
  this.phenomena = [];
  this.active_phenomenon = null;

  this.initialize = function() {
    // puh …
    var step = 360 / this.num_particles;
    var num = 0; // each particle gets a number
    for (var i = 0; i < 360; i += step) {
      var a = radians(i);
      var x = cos(a);
      var y = sin(a);
      var m = 220; // magnitude
      var v = createVector(x, y);
      v.mult(m);
      var p = new Partikel(num, v, 20);
      this.particles.push(p);
      num += 1;
    }

    // bis auf Weiteres:
    // Phaenomenon besteht aus zufälliger
    // Auswahl verfügbarer Partikel.
    for (var i = 0; i < this.num_phenomena; i++) {
      var phenomenon = new Phenomenon((i+1) * 3);
      phenomenon.initialize();
      this.phenomena.push(phenomenon);
    }
    this.active_phenomenon = this.phenomena[this.phenomena.length-1];
  };

  this.switchPhenomenon = function() {
    // puh …
  };

  this.displayPhenomena = function() {
    this.active_phenomenon.display("yes");
  }

  this.displayParticles = function() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].repraesentieren();
    }
  }
}
