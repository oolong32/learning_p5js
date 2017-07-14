function World(particles, phenomena) {
  this.num_particles = particles;
  this.num_phenomena = phenomena;
  this.particles = [];
  this.phenomena = [];
  this.active_phenomenon = null;
  this.active_phenomenon_index = null;
  this.transformation_data = null;
  this.ctr = Math.random() * 1000; // für noise
  this.noise_range = 0;


  this.initialize = function() {
    // =======================
    // Partikel initialisieren
    // =======================
    for (var n = 0; n < this.num_particles; n++) {
      var v = createVector();
      var p = new Partikel(n, v, 20);
      this.particles.push(p);
    }
    // Partikel positionieren
    // this.positionParticles(); // rechenintensiv (3D Noise)
    this.positionParticlesSimple(); // simpler
    
    // ===================
    // initialize phenomena
    // ===================

    // umbauen wie folgt:
    // anzahl = data.length
    // bisher: argument für new Phenomenon() war Anzahl Eckpunkte.
    // Neu: das argument für new Phenomenon() wird ein Objekt
    // Alles andere in phenomenon.js
    for (var i = 0; i < data.length; i++) { // iterate over data from JSON stash
      // Phänomene werden anhand einer JSON Datei generiert, die in preload() geladenw wird.
      var phenomenon = new Phenomenon(data[i]);
      phenomenon.initialize();
      this.phenomena.push(phenomenon);
    }
    var active = Math.trunc(this.phenomena.length / 2); // <----------------------- hardcoded, muss weg, gäll?
    this.active_phenomenon = this.phenomena[active];
    this.active_phenomenon_index = active;
    var now = new Date();
    this.active_phenomenon.timestamp = now.getTime();
  };

  // ======================
  // Partikel positionieren
  // ======================
  this.positionParticles = function() {
    var i = 0; // index of particle
    var xoff = 0;
    for (var a = 0; a < TWO_PI; a += TWO_PI / this.num_particles) {
      var cos_a = cos(a);
      var sin_a = sin(a);
      var laerm = noise(cos_a + 1, sin_a + 1, this.ctr);
      var range = this.active_phenomenon.drift; // auch dies besser this.turbulence oder so … könnte auch mit noise manipuliert werden?
      var m = 220 + map(laerm, 0, 1, -range, range); // 220 = magnitude, should be a var of World (this.incentive) or something
      var x = cos_a * m;
      var y = sin_a * m;
      this.particles[i].pos.x = x;
      this.particles[i].pos.y = y;
      i += 1;
    }
    this.ctr += 0.01
    // verdammt rechenintensiv, was?
  };

  // ======================
  // Partikel positionieren, weniger rechenintensiv
  // ======================
  this.positionParticlesSimple = function() { // wie bei Shiffman, blobby
    var i = 0; // index of particle
    var xoff = 0;
    var yoff = this.ctr;
    for (var a = 0; a < TWO_PI; a += TWO_PI / this.num_particles) {
      var cos_a = cos(a);
      var sin_a = sin(a);
      var laerm = noise(xoff, yoff);
      var range = this.active_phenomenon ? this.active_phenomenon.drift : this.noise_range;
      var m = 220 + map(laerm, 0, 1, -range, range); // 220 = magnitude, should be a var of World (this.incentive) or something
      var x = cos_a * m;
      var y = sin_a * m;
      this.particles[i].pos.x = x;
      this.particles[i].pos.y = y;
      i += 1;
      xoff += 0.5;
    }
    this.ctr += 0.01;
  };

  // === ===== =====
  // Set Noise Range
  // === ===== =====
  // this.setNoiseRange = function(new_noise_range) {
  //   this.noise_range = new_noise_range;
  //   return true;
  // };
  

  // ====================
  // Verwandlung auslösen
  // ====================
  this.initializeTransformation = function(i) {
    if (!this.phenomena[this.active_phenomenon_index + i]) {
      console.log("no more phenomena in this direction");
    } else {
      if (!this.transformation_data) {
        this.transformation_data = {
          // könnte auch per index & phänomene überspringen.
          direction: i,
          cur_phe_index:  this.active_phenomenon_index,
          tar_phe_index:  this.active_phenomenon_index + i,
          cur_num_nodes:  this.active_phenomenon.current_hosts.length,
          tar_num_nodes:  this.phenomena[this.active_phenomenon_index + i].original_hosts.length || null, // <----?
          cur_first_host: this.active_phenomenon.current_hosts[0], // <---------------------------------------------------sollte hier nicht was anderes rauskommen als 0?
          tar_first_host: this.phenomena[this.active_phenomenon_index + i].original_hosts[0], // <------------------------sollte hier nicht was anderes rauskommen als 0?
          // positions of all nodes need to be compared as well
          cur_hosts: null, // will be set ad hoc
          tar_hosts: null
        }; 
        console.log(this.transformation_data);
      } else {
        console.log("Transformation in progress, please wait until it’s done"); // not sure if this needs to be tested at all
        // ok, this happens after we click the tranform button for the first time
      }
    }
  };

  // Verwandlung
  // ===========
  this.transformPhenomenon = function() {
    if (!this.transformation_data) { // no data, no transformation
      return null; // is there a way to prevent calling this function at all without data etc.? not really, it gets called every frame :-/
    } else { // there is tranformation data, so let’s do it

      // -- not sure yet if this is placed right
      if (this.active_phenomenon.feelers_active == true) { // check if the feelers are active
        this.active_phenomenon.feelers_active = false;
      }
      // Das ist alles gut und schön, aber es führt zu sehr schnellen übergängen. schöner wäre es, wenn das Zurückziehen der Fühler etwas länger sichtbar wäre.
      this.active_phenomenon.normalizeBezierControlPoints();
      // -- not sure yet if this is placed right

      if (!this.phenomena[this.transformation_data.tar_phe_index]) {
        console.log("no phenomenon left in this direction");
      } else {
      var data = this.transformation_data;
        if (data.cur_num_nodes === data.tar_num_nodes) { // is the number of nodes the same?  
          // console.log("number of nodes adjusted");

          if (data.cur_first_host === data.tar_first_host) { // is the position of the first nodes the same?
            // console.log("rotation finished, that is …");
            // console.log("position of first nodes synced");

            if (data.cur_num_nodes > 1) { // are there more nodes than the first one?
              // console.log("wait … there are more nodes that need processing");
              // add list of nodes to transformation_data (ad hoc)
              this.transformation_data.cur_hosts = this.active_phenomenon.current_hosts;
              this.transformation_data.tar_hosts = this.phenomena[data.tar_phe_index].original_hosts;

              // update data
              data = this.transformation_data;

              // compare current & target hosts
              var cur_hosts = this.transformation_data.cur_hosts;
              var tar_hosts = this.transformation_data.tar_hosts;
              var all_synced = true; // optimistic premise
              for (var i = 1; i < cur_hosts.length; i++) { // process unsynced nodes
                if (cur_hosts[i] != tar_hosts[i]) {
                  all_synced = false;
                  if (cur_hosts[i] < tar_hosts[i]) {
                    this.active_phenomenon.replaceHostRight(i); 
                    this.transformation_data.cur_hosts[i] = this.active_phenomenon.current_hosts[i]; // update data
                  } else {
                    this.active_phenomenon.replaceHostLeft(i); 
                    this.transformation_data.cur_hosts[i] = this.active_phenomenon.current_hosts[i]; // update data
                  }
                }
                specs('update'); // update specs;
              }
              if (all_synced) { // we thought we’re done …
                // console.log("en sync");
                // console.log("set new index to swap phenomena. was " + this.active_phenomenon_index + ", new: " + this.transformation_data.tar_phe_index);
                this.active_phenomenon = this.phenomena[this.transformation_data.tar_phe_index]; // swap phenomena
                this.active_phenomenon_index = this.transformation_data.tar_phe_index; // set new index


                // dies scheint länger zu dauern. wie können wir warten, bis da was zurückkommt?
                this.phenomena[data.cur_phe_index].resetNodes(); // reset hosts in original phenomenon
                // console.log(this.phenomena[data.cur_phe_index].current_hosts);

                this.transformation_data = null; // reset transformation data object
                // console.log("swapped and done");
                specs("update");
              } 
            } else { // there’s only one node, and it’s in place
              //
              // proceed to swapping phenomena
              // not covered so far. do we ever have to?
              //
            }
          } else { // position of first node is not the same
            // console.log("position first node current: " + data.cur_first_host);
            // console.log("position first node target: " + data.tar_first_host);
            if (data.cur_first_host < data.tar_first_host) {
              // we might as well push/pull it
              this.active_phenomenon.rotateCW();
              this.transformation_data.cur_first_host = this.active_phenomenon.current_hosts[0]; // update data
              // so far we haven’t looked at the other nodes, so we can leave them alone
            } else {
              this.active_phenomenon.rotateCCW();
              this.transformation_data.cur_first_host = this.active_phenomenon.current_hosts[0]; // update data
            }
          }
        } else { // if number of nodes not the same
          // console.log("we have " + data.cur_num_nodes);
          // console.log("we need " + data.tar_num_nodes);
          if (data.cur_num_nodes < data.tar_num_nodes && this.active_phenomenon.wane === false) {
            this.active_phenomenon.pushNode();
            this.transformation_data.cur_num_nodes = this.active_phenomenon.current_hosts.length; // update data
            specs('update'); // update specs;
          } else if (data.cur_num_nodes > data.tar_num_nodes && this.active_phenomenon.wax === false){
            this.active_phenomenon.pullNode(); // while it’s pulling/pushing, nothing else should happen!
            this.transformation_data.cur_num_nodes = this.active_phenomenon.current_hosts.length; // update data
            specs('update'); // update specs;
          } else {
            // not sure if this really happens anytime?
            console.log("waxing/waning in progress");
          } 
        }
      } // transformation flow ends here
    }
  };

  this.displayPhenomena = function() {
    this.active_phenomenon.display("yes");
  }

  this.displayParticles = function() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].display(); // können wir die Namen der Methoden zur Darstellung vereinheitlichen bitte?
    }
  }
}
