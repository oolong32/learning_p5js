function World(particles, phenomena) {
  this.num_particles = particles;
  this.num_phenomena = phenomena;
  this.particles = [];
  this.phenomena = [];
  this.active_phenomenon = null;
  this.active_phenomenon_index = null;
  this.transformation_data = null;
  this.ctr = Math.random() * 1000; // für noise

  this.initialize = function() {
    // Partikel initialisieren
    for (var n = 0; n < this.num_particles; n++) {
      var v = createVector();
      var p = new Partikel(n, v, 20);
      this.particles.push(p);
    }
    // Partikel positionieren
    this.positionParticles();

    // initialize phenomena
    for (var i = 0; i < this.num_phenomena; i++) {
      // bis auf Weiteres: Phaenomenon besteht aus zufälliger
      // Auswahl verfügbarer Partikel.
      var phenomenon = new Phenomenon((i+1) * 3);
      phenomenon.initialize();
      this.phenomena.push(phenomenon);
    }
    var active = this.phenomena.length - 1; // hardcoded, muss weg, gäll
    this.active_phenomenon = this.phenomena[active];
    this.active_phenomenon_index = active;
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

  // Verwandlung auslösen
  // ====================
  this.initializeTransformation = function(i) {
    if (!this.transformation_data) {
      this.transformation_data = {
        direction: i,
        cur_phe_index: this.active_phenomenon_index,
        tar_phe_index: this.active_phenomenon_index + i,
        cur_num_nodes: this.active_phenomenon.current_hosts.length,
        tar_num_nodes: this.phenomena[this.active_phenomenon_index + i].original_hosts.length,
        cur_first_host: this.active_phenomenon.current_hosts[0],
        tar_first_host: this.phenomena[this.active_phenomenon_index + i].original_hosts[0],
        cur_hosts: null,
        tar_hosts: null
        // positioins of all nodes need to be compared as well
        // könnte auch per index & phänomene überspringen.
      }; 
      console.log(this.transformation_data);
    }
  };

  // Verwandlung
  // ===========
  this.transformPhenomenon = function() {
    if (this.transformation_data) {
      //
      // is the number of nodes the same?
      // if not, are there less or more nodes in the target? reduce/add a node.
      // is the position of the first nodes the same?
      // if there are any, is the position of all other nodes the same? 
      // if all of the above are achieved, we may switch to the next phenomenon, thank you
      //
      var target_index = this.active_phenomenon_index + this.transformation_data.direction;
      console.log(target_index);
      var target_phenomenon = this.phenomena[target_index];
      if (target_phenomenon) {
        console.log("shift from phenomenon " + this.active_phenomenon_index + " to phenomenon " + target_index);
        // count nodes
        console.log("Number of nodes in current phenomenon: " + this.active_phenomenon.original_hosts.length);
        console.log("Number of nodes in target phenomenon: " + target_phenomenon.original_hosts.length);
        // compare hosts
        console.log(this.phenomena[this.active_phenomenon_index].current_hosts);
        console.log(this.phenomena[target_index].original_hosts);
      } else {
        console.log("no phenomenon left in this direction");
        this.transformation_data = null;
      }
      //
      // 
      // avoid too many logs
      this.transformation_data = null;
    } else {
      // nothing.
    }
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
