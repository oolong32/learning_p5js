function Phenomenon(num) {
  this.anzahl_partikel = world.particles.length || 0; // Menge aller Partikel
  this.wane = false;
  this.wax = false;

  this.nodes = []; // i.O. muss nicht geändert werden.
  // bis auf Weiteres zufällige Auswahl aus Partikeln
  // d.h. nur deren Index! Dieser Array ist nur für die Initialisierung von Belang
  // in this.nodes werden zahlen nicht aufsteigend, sondern durcheinander gespeichert.
  // geordnet werden sie später, wenn this.original_hosts befüllt wird.

  this.original_hosts = []; // Indexe der Partikel, wo bei Initialisierung Knoten ankern 

  this.freie_partikel = []; // enthält Indexe der Partikel, die nicht als Hosts fungieren.
                            // Nebst der Frage, ob von 'Hosts' und 'Freien' gesprochen wird,
                            // ist hier von Interesse: Diese Listen werden nicht beeinflusst
                            // von wax/wane. All dies betrifft nur 'current_hosts'.

  this.current_hosts = [];  // Indexe der Hosts der sichtbaren Repräsentation des Phänomens.
                            // wird gebraucht, damit die ursprüngliche Form des Phänomens
                            // unverändert bleibt, auch wenn sich das Phänomen der Form eines
                            // 'Zielphänomens' annähert (wax/wane).

  this.growing_node =  null; // hier wird, so lange (this.wax == true) ein Objekt gespeichert,
                             // mit 'temporärem Hosts', an denen sich der wachsende Knoten
                             // entlangbewegt und mit der Position (num) des Zielpartikels
                             // sobald dieses Partikel erreicht ist, wird es in die current_hosts
                             // geschrieben und die Variable growing_node wieder auf null gesetzt.

  this.changing = null; // hier wird, so lange die Verwandlung dauert ein Objekt gespeichert, welches Infos zur Verwandlung enthält …
  // streichen? <----------------------------------------- oder?

  // Das Phänomen initialisieren
  // ===========================
  this.initialize = function() {
    // choose active Particle’s indexes
    while (this.nodes.length < num) {
      random_index = floor(random(this.anzahl_partikel));
      if (this.nodes.length < 1) {
        this.nodes.push(random_index);
      } else {
        var same = false;
        for (var i = 0; i < this.nodes.length; i++) {
          if (this.nodes[i] === random_index) {
            // console.log("oh no, value already in array");
            same = true;
            break;
          }
        }
        if (!same) {
          this.nodes.push(random_index);
        }
      }
    } // bis hier: this.node befüllen, um eine zufällige Auswahl von Knoten zu erhalten

    // Particles in 'Hosts' and 'Freie' teilen
    // bleibt zu beweisen, ob 'Freie' notwendig sind.
    for (var i = 0; i < this.anzahl_partikel; i++) {
      var found = false;
      for (var n = 0; n < this.nodes.length; n++) {
        if (i === this.nodes[n]) {
          this.original_hosts.push(i);
          this.current_hosts.push(i);
          found = true;
          break;
        }
      }
      if (!found) {
        this.freie_partikel.push(i);
      }
    }
  };

  // sync representation with original shape
  // to be used after transformation =======
  // =======================================
  this.resetNodes = function() {
    // this.current_hosts = this.original_hosts;
    // return true;
    this.current_hosts = [];
    this.original_hosts = [];
    for (var i = 0; i < this.anzahl_partikel; i++) {
      var found = false;
      for (var n = 0; n < this.nodes.length; n++) {
        if (i === this.nodes[n]) {
          this.original_hosts.push(i);
          this.current_hosts.push(i);
          found = true;
          break;
        }
      }
    }
    console.log("done");
    return true;
  };

  // removes node that’s nearest to another one
  // ==========================================
  this.pullNode = function() {
    // identify position of smallest small_gap between nodes
    var small_gap = this.findSmallGap();

    var gap = small_gap[1];
    var pos_left_node = small_gap[0];
    var pos_right_node = (pos_left_node + gap) % this.anzahl_partikel;
    if (this.current_hosts.length > 1) { // more than one node/host for phenomenon
      if (pos_right_node % this.anzahl_partikel != pos_left_node) { // left & right host distinct
        this.replaceHostLeft((small_gap[2] + 1) % this.current_hosts.length);
      } else { // last and second_last overlapping
        this.current_hosts.splice((small_gap[2] + 1) % this.current_hosts.length, 1);
        this.wane = false;
        return null;
      }
    } else { // only one particle left
      console.log("no further reduction possible")
      this.wane = false;
      return null;
    }
  };

  // adds node at random pos in biggest gap
  // ======================================
  this.pushNode = function() {
    var big_gap = this.findBigGap();

    if (!big_gap) { // es sind keine Lücken mehr frei
      // console.log("no mo’ gaps, yo!");
      this.wax = false;
      this.growing_node = null; // this.growing_node zurücksetzen
      return null;

    } else { // es gibt noch Lücken zwischen den Knoten

      if (!this.growing_node) {
        // alles was die Lücke betrifft
        var gap = big_gap[1];
        var pos_left_node = big_gap[0];
        var pos_right_node = (pos_left_node + gap) % this.anzahl_partikel;
        // var step = Math.floor(gap / 2); // in der Mitte
        var step = Math.floor(Math.random() * (gap - 1) + 1); // irgendwo dazwischen
        var pos_new_node = (pos_left_node + step) % this.anzahl_partikel;
        // neuen Knoten initialisieren 
        this.growing_node = {};
        this.growing_node["temp_host"] = pos_left_node;
        this.growing_node["target_host"] = pos_new_node;
    
        // die sichtbare Form erhält einen neuen Knoten, der im Moment noch
        // am gleichen Ort ankert  wie sein vorhergehender Nachbar
        var new_index = big_gap[2] + 1 % this.current_hosts.length;
        this.current_hosts.splice(new_index, 0, this.listAllParticles()[this.growing_node["temp_host"]].num);
        this.growing_node["pos_in_nodes"] = new_index; // Welchen Index hat der neue Knoten?
      }

      if (this.growing_node["temp_host"] != this.growing_node["target_host"]) {
        this.replaceHostRight(this.growing_node["pos_in_nodes"]);
        this.growing_node["temp_host"] = this.current_hosts[this.growing_node["pos_in_nodes"]];
        // this.wax bleibt true
        return null;

      } else { // new_node ist noch unterwegs
        // Wachstum beendet
        // console.log("finished growing");
        this.wax = false;
        
        // Behälter für neuen Knoten leeren
        this.growing_node = null;
        return null;
      }
    }
  };

  this.listGaps = function() {
    // returns array with
    // - index of host before each gap
    // - gaps between hosts
    // - index in current_hosts 
    if (this.current_hosts.length < this.anzahl_partikel) {
      var gaps = [];
      if (this.current_hosts.length > 1) {
        for (var n = 0; n < this.current_hosts.length; n++) {
          var next_host = (n + 1) % this.current_hosts.length;
          var gap = (this.current_hosts[next_host] + this.anzahl_partikel - this.current_hosts[n]) % this.anzahl_partikel;
          gaps.push([this.current_hosts[n], gap, n]);
        }
      } else {
        gaps.push([this.current_hosts[0], this.anzahl_partikel - 1, 0]);
      }
      return gaps;
    } else {
      return null; // findBigGap gets null, returns it to pushNode
    }
  };

  this.findSmallGap = function() {
    // returns first of smallest gaps between hosts
    var gaps = this.listGaps();
    if (!gaps) { // no gaps, which one to reduce?
      var random_host = Math.floor(Math.random() * this.current_hosts.length); 
      var smallest_gap = [this.current_hosts[random_host], 0, random_host];
    } else { // there are gaps, let’s compare
      var smallest_gap = gaps.reduce(function(curr, next) {
        if (curr[1] <= next[1]) {
          return curr;
        } else {
          return next;
        }
      });
    }
    return smallest_gap;
  };

  this.findBigGap = function() {
    // returns first of biggest gaps between hosts
    var gaps = this.listGaps();
    if (!gaps) {
      return null; // pushNode not possible
    }
    if (gaps.length > 1) {
      var biggest_gap = gaps.reduce(function(curr, next) {
        if (curr[1] >= next[1]) {
          return curr;
        } else {
          return next;
        }
      });
      return biggest_gap;
    } else { // ohne diese Bedingung gibt es Fehler bei der Lücke vor pos 0
      return gaps[0];
    }
  };

  this.replaceHostLeft = function(i) { // ‘moves’ node at index i one space ccw
    var preceding = (this.current_hosts[i] - 1 + this.anzahl_partikel) % this.anzahl_partikel;
    this.current_hosts[i] = preceding;
  };

  this.replaceHostRight = function(i) { // ‘moves’ node at index i one space cw
    var succeeding = (this.current_hosts[i] + 1) % this.anzahl_partikel;
    this.current_hosts[i] = succeeding;
  };

  this.rotateCW = function() { // rotates the representation clockwise
    for (var i = 0; i < this.current_hosts.length; i++) {
      this.replaceHostRight(i); 
    }
  };

  this.rotateCCW = function() { // rotates the representation counterclockwise
    for (var i = 0; i < this.current_hosts.length; i++) {
      this.replaceHostLeft(i); 
    }
  };

  this.display = function(option) {
    // draw active particles
    // if option is set, an ellipsis is drawn around particles
    for (var i = 0; i < this.current_hosts.length; i++) {
      var das_partikel = this.listAllParticles()[this.current_hosts[i]];
      if (das_partikel) {
        das_partikel.repraesentieren(option);
      } else {
        console.log("we lost a particle, what?");
        // ab hier endless loop :-(
        break;
      }
    };
    
    // draw line
    push();
    stroke(255, 50, 0);
    beginShape();
    for (var i = 0; i < this.current_hosts.length; i++) {
      // avoid dropping the ball
      // it seems the values in this array don’t get written in time
      // sometimes.
      if (!this.current_hosts[i] && this.current_hosts[i] != 0) { // 0 seems to be falsy !?
        console.log("dropped a position, for heaven’s sake");
        var pos = createVector(0, 0);
      } else {
        var pos = this.listAllParticles()[this.current_hosts[i]].pos;
      }
      vertex(pos.x, pos.y);
    };
    endShape(CLOSE);
    pop();
  };

  // Liste aller existierenden Partikel
  this.listAllParticles = function() {
    if (!world.particles) {
      console.log("world not ready, what!");
      return null;
    } else {
      return world.particles;
    }
  };

  // Liste der Partikel, die einen Knoten des
  // repräsentierten Phänomens beherbergen
  this.listCurrentHosts = function() {
    var curHosts;
    var particles = this.listAllParticles();
    if (!particles) {
      // console.log(particles);
      curHosts = null;
    } else {
      curHosts = [];
      for (var i = 0; i < this.nodes.length; i++) {
        var index = this.nodes[i];
        var currentHost = particles[index];
        curHosts.push(currentHost);
      }
    }
    return curHosts;
  };
}
