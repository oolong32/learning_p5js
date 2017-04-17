function Phenomenon(p_list, num) {
  this.gesamt_partikel = p_list; // all particle objects
  // wichtige Frage:
  // ist das eine Kopie von p_list oder nicht?

  this.anzahl_partikel = p_list.length;
  this.shrink = false;
  this.grow = false;

  this.random_indexes = [];    // bis auf Weiteres Auswahl
  this.aktive_partikel = [];   // Auswahl aus p_list
  this.inaktive_partikel = []; // Rest der p_list
  this.current_form = [];      // wird gebraucht, damit die ursprüngliche
  // Form des Phänomens unverändert bleibt, auch wenn sich das Phänomen
  // der Form eines «Nachbarn» annähert (siehe reducePhenomenon/pullLast).

  this.initialize = function() {
    // choose active Particle’s indexes
    while (this.random_indexes.length < num) {
      random_index = floor(random(this.anzahl_partikel));
      if (this.random_indexes.length < 1) {
        this.random_indexes.push(random_index);
      } else {
        var same = false;
        for (var i = 0; i < this.random_indexes.length; i++) {
          if (this.random_indexes[i] === random_index) {
            // console.log("oh no, value already in array");
            same = true;
            break;
          }
        }
        if (!same) {
          this.random_indexes.push(random_index);
        }
      }
    }
    // divide Particles into active and inactive
    for (var i = 0; i < this.anzahl_partikel; i++) {
      var found = false;
      for (var n = 0; n < this.random_indexes.length; n++) {
        if (i === this.random_indexes[n]) {
          this.aktive_partikel.push(this.gesamt_partikel[i]);
          this.current_form.push(this.gesamt_partikel[i]);
          found = true;
          break;
        }
      }
      if (!found) {
        this.inaktive_partikel.push(this.gesamt_partikel[i]);
      }
    }
  }

  this.reducePhenomeon = function() {
    // identify position of last active particle
    var gap = this.findSmallestGap()[1];
    var pos_left_particle = this.findSmallestGap()[0].num;
    var pos_right_particle = (pos_left_particle + gap) % this.anzahl_partikel;

    if (this.current_form.length > 1) { // more than one particle in phenomenon
      if (pos_right_particle % this.anzahl_partikel != pos_left_particle) { // left particle distinct from right particle
        this.pullLast((this.findSmallestGap()[2] + 1) % this.current_form.length);
      } else { // last and second_last overlapping
        this.current_form.splice((this.findSmallestGap()[2] + 1) % this.current_form.length, 1);
        this.shrink = false;
        return null;
      }
    } else { // only one particle left
      console.log("no further reduction possible")
      this.shrink = false;
      return null;
    }
  }

  this.listGaps = function() {
    // returns array with gaps between active particles,
    // and the particle before each gap, and the index in the current_form array
    var gaps = [];
    for (var n = 0; n < this.current_form.length; n++) {
      var next_point = (n + 1) % this.current_form.length; // sonst gibts beim letzten Punkt Fehler
      // hier Modulo um Unstimmigkeiten um den Nullpunkt herum zu vermeiden
      var gap = (this.current_form[next_point].num + this.anzahl_partikel - this.current_form[n].num) % this.anzahl_partikel;
      gaps.push([this.current_form[n], gap, n]);
    }
    return gaps;
  }

  this.findSmallestGap = function() {
    // returns array of smallest gap between active particles and it’s preceeding particle
    var gaps = this.listGaps();
    var smallest_gap = gaps.reduce(function(curr, next) {
      if (curr[1] <= next[1]) {
        return curr;
      } else {
        return next;
      }
    });
    return smallest_gap;
  }

  this.findBiggestGap = function() {
    // returns array of largest gap between active particles and it’s preceeding particle
    var gaps = this.listGaps();
    var biggest_gap = gaps.reduce(function(curr, next) {
      if (curr[1] >= next[1]) {
        return curr;
      } else {
        return next;
      }
    });
    return biggest_gap;
  }

  this.pullLast = function(i) { // ‘moves’ particle at index i one space ccw
    // Modulo verhindert Probleme am Nullpunkt
    var preceding = (this.current_form[i].num - 1 + this.anzahl_partikel) % this.anzahl_partikel;
    this.current_form[i] = this.gesamt_partikel[preceding];
  }

  this.pushLast = function() {
    // now, would’t it be great if we chose not the last, but the one furthest from it’s neighbor?
    var last_index = this.current_form.length - 1;
    var last_particle = this.current_form[last_index];
    // replace particle with succeding one
    this.current_form[last_index] = this.gesamt_partikel[last_particle.num+1]; 
  }

  this.display = function(option) {
    // draw active particles
    // if option is set, an ellipsis is drawn around particles
    for (var i = 0; i < this.current_form.length; i++) {
      var das_partikel = this.current_form[i];
      das_partikel.repraesentieren(option);
    };
    
    // draw line
    push();
    stroke(255, 50, 0);
    beginShape();
    for (var i = 0; i < this.current_form.length; i++) {
      var pos = this.current_form[i].pos;
      vertex(pos.x, pos.y);
    };
    endShape(CLOSE);
    pop();
  }
}
