function Phenomenon(p_list, num) {
  this.gesamt_partikel = p_list; // all particle objects
  // wichtige Frage:
  // ist das eine Kopie von p_list oder nicht?

  this.anzahl_partikel = p_list.length;
  this.wane = false;
  this.wax = false;

  this.nodes = [];    // bis auf Weiteres zufällige Auswahl aus Partikeln

  // Partikel, Host/Frei
  this.host_partikel = [];  // Auswahl aus p_list: Hier ankern die Knoten
  this.freie_partikel = []; // Rest der p_list: Hier ankern keine Knoten
                            // Nebst der Frage, ob von 'Hosts' und 'Freien' gesprochen wird,
                            // ist hier von Interesse: Diese Listen werden nicht beeinflusst
                            // von wax/wane. all das betrifft nur 'current_hosts'

  this.current_hosts = [];  // wird gebraucht, damit die ursprüngliche
                            // Form des Phänomens unverändert bleibt, auch wenn sich das Phänomen
                            // der Form eines 'Zielphänomens' annähert (wax/wane).
  
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
    }
    // divide Particles into 'Hosts' and 'Freie'
    for (var i = 0; i < this.anzahl_partikel; i++) {
      var found = false;
      for (var n = 0; n < this.nodes.length; n++) {
        if (i === this.nodes[n]) {
          this.host_partikel.push(this.gesamt_partikel[i]);
          this.current_hosts.push(this.gesamt_partikel[i]);
          found = true;
          break;
        }
      }
      if (!found) {
        this.freie_partikel.push(this.gesamt_partikel[i]);
      }
    }
  };

  this.pullNode = function() {
    // identify position of smallest small_gap between nodes
    var small_gap = this.findSmallGap();

    var gap = small_gap[1];
    var pos_left_node = small_gap[0].num;
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

  this.pushNode = function() {
    var big_gap = this.findBigGap(); // call the function only once and leave it alone

    if (!big_gap) { // es sind keine Lücken mehr frei
      console.log("no mo’ gaps, yo!");
      this.wax = false;
      this.growing_node = null; // this.growing_node zurücksetzen
      return null;

    } else { // es gibt noch Lücken zwischen den Knoten

      var gap = big_gap[1];

      var pos_left_node = big_gap[0].num;
      var pos_right_node = (pos_left_node + gap) % this.anzahl_partikel;
      var step = Math.floor(gap / 2);
      var pos_new_node = (pos_left_node + step) % this.anzahl_partikel;


      if (!this.growing_node) {
        // neuen Knoten initialisieren 
        this.growing_node = {};
        this.growing_node["temp_host"] = pos_left_node;
        this.growing_node["target_particle"] = pos_new_node;
    
        // die sichtbare Form erhält einen neuen Knoten, der im Moment noch
        // am gleichen Ort ankert  wie sein vorhergehender Nachbar
        var new_index = big_gap[2] + 1 % this.current_hosts.length;
        this.current_hosts.splice(new_index, 0, this.gesamt_partikel[this.growing_node["temp_host"]]);
        this.growing_node["pos_in_nodes"] = new_index; // wir müssen im auge behalten, welchen index der neue knoten hat
      }


      if (this.growing_node["temp_host"] === this.growing_node["target_particle"]) { // temp_host stimmt mit target_particle überein

        // Wachstum beendet
        console.log("finished growing");
        this.wax = false;
        
        // Behälter für neuen Knoten leeren
        this.growing_node = null;
        return null;

      } else { // new_node ist noch unterwegs
        this.replaceHostRight(this.growing_node["pos_in_nodes"]);
        this.growing_node["temp_host"] = this.current_hosts[this.growing_node["pos_in_nodes"]].num; // ev. besser die num des Hosts abzufragen? was ist mit modulo?
        // this.wax bleibt true
        return null;
      }
    }
  };

  this.listGaps = function() {
    // returns array with
    // - gaps between hosts
    // - host before each gap
    // - index in current_hosts 
    if (this.current_hosts.length < this.anzahl_partikel) {
      var gaps = [];
      if (this.current_hosts.length > 1) {
        for (var n = 0; n < this.current_hosts.length; n++) {
          var next_host = (n + 1) % this.current_hosts.length;
          var gap = (this.current_hosts[next_host].num + this.anzahl_partikel - this.current_hosts[n].num) % this.anzahl_partikel;
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
    // Modulo verhindert Probleme am Nullpunkt
    var preceding = (this.current_hosts[i].num - 1 + this.anzahl_partikel) % this.anzahl_partikel;
    this.current_hosts[i] = this.gesamt_partikel[preceding];
  };

  this.replaceHostRight = function(i) { // ‘moves’ node at index i one space cw
    var succeeding = (this.current_hosts[i].num + 1) % this.anzahl_partikel;
    this.current_hosts[i] = this.gesamt_partikel[succeeding];
  };

  this.display = function(option) {
    // draw active particles
    // if option is set, an ellipsis is drawn around particles
    for (var i = 0; i < this.current_hosts.length; i++) {
      var das_partikel = this.current_hosts[i];
      das_partikel.repraesentieren(option);
    };
    
    // draw line
    push();
    stroke(255, 50, 0);
    beginShape();
    for (var i = 0; i < this.current_hosts.length; i++) {
      var pos = this.current_hosts[i].pos;
      vertex(pos.x, pos.y);
    };
    endShape(CLOSE);
    pop();
  };
}
