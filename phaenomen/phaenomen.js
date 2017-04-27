function Phenomenon(p_list, num) {
  //
  // =========================
  // = Projekt Good Riddance =
  // =========================
  // Ziel: p_list wird obsolet.
  // keine Objekte/Partikel in Phänomenen speichern.

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

  // ===========================
  // this.current_hosts enthält Objekte.
  // ===========================
  // Plan: alle Methoden, die this.current_hosts enthalten so umbauen, dass sie mit Index statt Objekt arbeiten, 
  // dann alles ersetzen. ungefähr so: this.bla.bla.bla.num -> this.current_hosts[x]

  this.current_hosts = [];  // wird gebraucht, damit die ursprüngliche
                            // Form des Phänomens unverändert bleibt, auch wenn sich das Phänomen
                            // der Form eines 'Zielphänomens' annähert (wax/wane).

  // auch hier nur Index speichern!
  this.growing_node =  null; // hier wird, so lange (this.wax == true) ein Objekt gespeichert,
                             // mit 'temporärem Hosts' (die Hosts, an denen sich der wachsende Knoten entlangbewegt)
                             // und mit der Position (num) des Zielpartikels
                             // sobald dieses Partikel erreicht ist, wird es in die current_hosts geschrieben und
                             // die Variable growing_node wird wieder auf null gesetzt.

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
    for (var i = 0; i < this.anzahl_partikel; i++) {
      var found = false;
      for (var n = 0; n < this.nodes.length; n++) {
        if (i === this.nodes[n]) { // die Zahlen in this.nodes sind nicht aufsteigend, sondern durcheinander!
          console.log(i);
          this.original_hosts.push(i); // hier sollte nur i genommen werden, statt das ganze Objekt
          // !!!!
          // !!!!
          // vvvv
          this.current_hosts.push(this.listAllParticles()[i]); // hier sollte nur i genommen werden, statt das ganze Objekt
          // ^^^^
          // !!!!
          // !!!!
          found = true;
          break;
        }
      }
      if (!found) {
        this.freie_partikel.push(i);
      }
    }
  };

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
        // hier wird ein Element aus this.current_hosts entfernt ---------------------------- unproblematisch für Projekt Good Riddance
        // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
        // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
        this.wane = false;
        return null;
      }
    } else { // only one particle left
      console.log("no further reduction possible")
      this.wane = false;
      return null;
    }
  };

  this.pushNode = function() {
    var big_gap = this.findBigGap(); // call the function only once and leave it alone

    if (!big_gap) { // es sind keine Lücken mehr frei
      console.log("no mo’ gaps, yo!");
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
        // console.log(step);
        var pos_new_node = (pos_left_node + step) % this.anzahl_partikel;
        // neuen Knoten initialisieren 
        this.growing_node = {};
        this.growing_node["temp_host"] = pos_left_node;
        this.growing_node["target_particle"] = pos_new_node;
    
        // die sichtbare Form erhält einen neuen Knoten, der im Moment noch
        // am gleichen Ort ankert  wie sein vorhergehender Nachbar
        var new_index = big_gap[2] + 1 % this.current_hosts.length;
        // hier wird ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        // hier wird ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        // wahrsch. kein Problem, muss einfach beizeiten geändert werden.
        // hier wird ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        this.current_hosts.splice(new_index, 0, this.listAllParticles()[this.growing_node["temp_host"]]);
        // hier wird ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        // hier wird ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        // hier wird ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        this.growing_node["pos_in_nodes"] = new_index; // wir müssen im auge behalten, welchen index der neue knoten hat
      }

      if (this.growing_node["temp_host"] === this.growing_node["target_particle"]) { // temp_host stimmt mit target_particle überein

        // Wachstum beendet
        // console.log("finished growing");
        this.wax = false;
        
        // Behälter für neuen Knoten leeren
        this.growing_node = null;
        return null;

      } else { // new_node ist noch unterwegs
        this.replaceHostRight(this.growing_node["pos_in_nodes"]);
        // scheint einfach weil es schon um num geht ---------------------------------------------------------------------- Baustelle Good Riddance
        // scheint einfach weil es schon um num geht ---------------------------------------------------------------------- Baustelle Good Riddance
        // scheint einfach weil es schon um num geht ---------------------------------------------------------------------- Baustelle Good Riddance
        this.growing_node["temp_host"] = this.current_hosts[this.growing_node["pos_in_nodes"]].num; // ev. besser die num des Hosts abzufragen? was ist mit modulo?
        // scheint einfach weil es schon um num geht ---------------------------------------------------------------------- Baustelle Good Riddance
        // scheint einfach weil es schon um num geht ---------------------------------------------------------------------- Baustelle Good Riddance
        // scheint einfach weil es schon um num geht ---------------------------------------------------------------------- Baustelle Good Riddance
        //
        // this.wax bleibt true
        return null;
      }
    }
  };

  this.listGaps = function() {
    // returns array with
    // - gaps between hosts
    // - host before each gap <---------------------------------------- ist das ein Partikel? Baustelle Good Riddance
    // - index in current_hosts 
    if (this.current_hosts.length < this.anzahl_partikel) {
      var gaps = [];
      if (this.current_hosts.length > 1) {
        for (var n = 0; n < this.current_hosts.length; n++) {
          var next_host = (n + 1) % this.current_hosts.length;
          // hier wird auf die .num eines objekts aus current hosts referenziert – anpassen -------------------------Baustelle Good Riddance
          // hier wird auf die .num eines objekts aus current hosts referenziert – anpassen -------------------------Baustelle Good Riddance
          // hier wird auf die .num eines objekts aus current hosts referenziert – anpassen -------------------------Baustelle Good Riddance
          var gap = (this.current_hosts[next_host].num + this.anzahl_partikel - this.current_hosts[n].num) % this.anzahl_partikel;
          // hier wird auf die .num eines objekts aus current hosts referenziert – anpassen -------------------------Baustelle Good Riddance
          // hier wird auf die .num eines objekts aus current hosts referenziert – anpassen -------------------------Baustelle Good Riddance
          // hier wird auf die .num eines objekts aus current hosts referenziert – anpassen -------------------------Baustelle Good Riddance
          // hier wird auf die .num eines objekts aus current hosts referenziert – anpassen -------------------------Baustelle Good Riddance

          // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
          // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
          // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
          gaps.push([this.current_hosts[n].num, gap, n]);
          // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
          // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
          // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        }
      } else {
        // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        gaps.push([this.current_hosts[0].num, this.anzahl_partikel - 1, 0]);
        // an was wird das übergeben?
        // wird da etwas anderes gebraucht als index/num dieses objekts?
        // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
        // hier wird NICHT MEHR ein Objekt gespeichert ---------------------------------------------------------------------- Baustelle Good Riddance
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
      // hier wird eine zufällige Position in this.current_hosts gewählt ------------------------------------------ Baustelle Good Riddance
      // hier wird eine zufällige Position in this.current_hosts gewählt ------------------------------------------ Baustelle Good Riddance
      // hier wird eine zufällige Position in this.current_hosts gewählt ------------------------------------------ Baustelle Good Riddance
      // eher unroblematisch, was?
      // wo kommt das zum Einsatz? die Funktion findSmallGap gibt ein Objekt zurück!!!!!!!!!!!!
      var smallest_gap = [this.current_hosts[random_host], 0, random_host];
      // hier wird eine zufällige Position in this.current_hosts gewählt ------------------------------------------ Baustelle Good Riddance
      // hier wird eine zufällige Position in this.current_hosts gewählt ------------------------------------------ Baustelle Good Riddance
      // hier wird eine zufällige Position in this.current_hosts gewählt ------------------------------------------ Baustelle Good Riddance
    } else { // there are gaps, let’s compare
      var smallest_gap = gaps.reduce(function(curr, next) {
        if (curr[1] <= next[1]) { // <----------------------------------------wahrsch. kein Problem, aber prüfen -- Baustelle Good Riddance
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
        if (curr[1] >= next[1]) { // <-------------------------------------wahrsch. kein Problem, aber prüfen -- Baustelle Good Riddance
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
    // Modulo verhindert Probleme am Nullpunkt
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    var preceding = (this.current_hosts[i].num - 1 + this.anzahl_partikel) % this.anzahl_partikel;
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance

    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    this.current_hosts[i] = this.listAllParticles()[preceding];
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
  };

  this.replaceHostRight = function(i) { // ‘moves’ node at index i one space cw
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    var succeeding = (this.current_hosts[i].num + 1) % this.anzahl_partikel;
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance
    // unproblematisch, weil es hier bereits um num geht – so sollte es überall sein --------------------------------- Baustelle Good Riddance

    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    this.current_hosts[i] = this.listAllParticles()[succeeding];
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
    // hier hingegen … wird ein Objekt übergeben --------------------------------------------------------------------- Baustelle Good Riddance
  };

  this.display = function(option) {
    // draw active particles
    // if option is set, an ellipsis is drawn around particles
    for (var i = 0; i < this.current_hosts.length; i++) {

      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      var das_partikel = this.current_hosts[i];
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      das_partikel.repraesentieren(option);
    };
    
    // draw line
    push();
    stroke(255, 50, 0);
    beginShape();
    for (var i = 0; i < this.current_hosts.length; i++) {
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      var pos = this.current_hosts[i].pos;
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      // das hier sollte nicht so kompliziert werden --------------------------------------------------------------------- Baustelle Good Riddance
      vertex(pos.x, pos.y);
    };
    endShape(CLOSE);
    pop();
  };

  this.listAllParticles = function() {
    if (!world.particles) {
      console.log("world not ready, what!");
      return null;
    } else {
      return world.particles;
    }
  };

  this.listCurrentHosts = function() { // liste der Partikel, die einen Knoten des repräsentierten Phänomens beherbergen
    var curHosts;
    var particles = this.listAllParticles();
    if (!particles) {
      console.log(particles);
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
