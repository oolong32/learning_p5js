function World(particles, phenomena) {
  this.num_particles = particles;
  this.num_phenomena = phenomena;
  this.particles = [];
  this.phenomena = [];
  this.active_phenomenon = null;
  this.ctr = Math.random() * 1000; // für noise

  this.initialize = function() {
    // initialize particles, no position yet
    for (var n = 0; n < this.num_particles; n++) {
      var v = createVector();
      var p = new Partikel(n, v, 20);
      this.particles.push(p);
    }
    this.positionParticles(); // einmal positionieren bitte
    // initialize phenomena
    for (var i = 0; i < this.num_phenomena; i++) {
      // bis auf Weiteres:
      // Phaenomenon besteht aus zufälliger
      // Auswahl verfügbarer Partikel.
      var phenomenon = new Phenomenon((i+1) * 3);
      phenomenon.initialize();
      this.phenomena.push(phenomenon);
    }
    this.active_phenomenon = this.phenomena[this.phenomena.length-1];
  };

  this.positionParticles = function() {
    var i = 0; // index of particle
    var xoff = 0;
    for (var a = 0; a < TWO_PI; a += TWO_PI / this.num_particles) {
      var cos_a = cos(a);
      var sin_a = sin(a);
      var laerm = noise(cos_a + 1, sin_a + 1, this.ctr);
      var range = 40; // auch dies besser this.turbulence oder so … könnte auch mit noise manipuliert werden?
      var m = 220 + map(laerm, 0, 1, -range, range); // 220 = magnitude, should be a var of World (this.incentive) or something
      var x = cos_a * m;
      var y = sin_a * m;
      this.particles[i].pos.x = x;
      this.particles[i].pos.y = y;
      i += 1;
    }
    this.ctr += 0.01
  };

  this.switchPhenomenon = function() {
    // puh …
  };

  this.displayPhenomena = function() {
    this.active_phenomenon.display("yes");
  }

  this.displayParticles = function() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].repraesentieren(); // können wir die Namen der Methoden zur Darstellung vereinheitlichen bitte?
    }
  }
}
