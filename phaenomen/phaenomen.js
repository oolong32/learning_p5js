function Phenomenon(p_list, num) {
  this.gesamt_partikel = p_list;
  this.anzahl_Partikel = p_list.length;

  this.random_indexes = [];    // bis auf Weiteres Auswahl
  this.aktive_partikel = [];   // Auswahl aus p_list
  this.inaktive_partikel = []; // Rest der p_list
  this.current_form = [];      // wird gebraucht, damit die ursprüngliche Form des Phänomens unverändert bleibt, auch wenn sich das Phänomen der Form eines «Nachbarn» annähert (siehe reducePhenomenon/moveLast).

  this.initialize = function() {
    // choose active Particle’s indexes
    while (this.random_indexes.length < num) {
      random_index = floor(random(this.anzahl_Partikel));
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
    for (var i = 0; i < this.gesamt_partikel.length; i++) {
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

  this.reducePhenomeon = function(start_index, target_index) {
    var last_num = this.current_form[this.current_form.length-1].num;
    if (this.current_form.length > 1) {
      var second_last_num = this.current_form[this.current_form.length-2].num;
    } else {
      console.log("no further reduction possible")
      return null;
    }
    console.log("last: " + last_num + " second_last: " + second_last_num);
    if (last_num > second_last_num) {
      this.moveLast();
    } else {
      this.current_form.splice(this.current_form.length-1, 1);
    }
  }

  this.moveLast = function() {
    var last_index = this.current_form.length - 1;
    var last_particle = this.current_form[last_index];
    console.log(last_particle);
    console.log(last_particle.num);
    console.log(last_particle.num-1);
    console.log(this.gesamt_partikel[333]);
    this.current_form[last_index] = this.gesamt_partikel[last_particle.num-1]; 
    console.log(this.current_form[last_index]);
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
