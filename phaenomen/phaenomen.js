function Phenomenon(dataset) {
  
  // umbau:
  // neu gibt es nicht den parameter num, sondern ein objekt mit 12 Werten
  // diese werden mit map() in die this.eigenschaften geschrieben



  this.number_of_corners = parseInt(map(dataset.property01, 0, 12, 3, 21)) || 0; // Welche maximale Anzahl soll erlaubt sein?
  this.anzahl_partikel = world.particles.length || 0;
  console.log(this.anzahl_partikel);
  this.wane = false;
  this.wax = false;

  this.nodes = []; // i.O. muss nicht geändert werden.
  // bis auf Weiteres zufällige Auswahl aus Partikeln
  // d.h. nur deren Index! Dieser Array ist nur für die Initialisierung von Belang
  // in this.nodes werden zahlen nicht aufsteigend, sondern durcheinander gespeichert.
  // geordnet werden sie später, wenn this.original_hosts befüllt wird.

  this.original_hosts = []; // Indexe der Partikel, wo ab Initalisierg Knoten ankern 

  this.current_hosts = [];  // Indexe der Hosts der sichtbaren Repräsentation
                            // wird gebraucht, damit die ursprüngliche Form 
                            // unverändert bleibt, wenn sich das Phänomen der Form
                            // eines 'Zielphänomens' annähert (wax/wane).

  this.growing_node =  null; // wenn (this.wax == true) ein Objekt
                             // mit 'temporärem Hosts', an denen sich der Knoten
                             // entlangbewegt und mit Position (num) des Zielpartikels
                             // wenn das Ziel erreicht ist, wird es in current_hosts
                             // geschrieben und growing_node auf null gesetzt.

  this.feelers = [] // Fühler der einzelnen Knoten
  this.feelers_active = false; // wenn true, werden die fühler ausgefahren.
                               // wenn false und fühler da sind, werden sie eingefahren.

  this.age = null;

  // Noch nicht sicher ob das bleibt, aber das würde dazu dienen, der Umrrisslinie
  // Kurvenform zu geben. Es braucht einen pro Host.
  this.bezierControlPoints = [];

  this.hue_end = null;
  this.hue_start = null;
  this.stroke_weight_end = 1;
  this.stroke_weight_start = 1;
  this.drift = null; // Bewegung der Partikel
  this.segment_number = null;
  this.segment_length = null;
  this.brightness_end = null;
  this.brightness_start = null;
  this.transparency = null;
  this.saturation = null;

  // Das Phänomen initialisieren
  // ===========================
  this.initialize = function() {
    // timestamp
    this.age = Date.now();
    // choose active Particle’s indexes
    while (this.nodes.length < this.number_of_corners) {
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
    } // bis hier this.nodes befüllen, um zufällige Auswahl von Knoten zu erhalten

    // 'Hosts' unter den Partikeln finden
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
        // hier könnte man freie Partikel sammeln
      }
    }

    // jedem Knoten einen Fühler
    for (var i = 0; i < this.current_hosts.length; i++) {
      this.feelers.push(new Feeler());
      // Aktivierung geschieht innerhalb der Methode "display"
    }

    // Bezierkontrollpunkte
    for (var i = 0; i < this.current_hosts.length; i++) {
      var x = world.particles[this.current_hosts[i]].pos.x;
      var y = world.particles[this.current_hosts[i]].pos.y;
      // var x = Math.random();
      // var y = Math.random();
      var v = createVector(x, y);
      var vv = createVector(x, y);
      // control points
      var cp = {c1: v, c2: vv};
      this.bezierControlPoints.push(cp);
    }

    // Farbton
    this.hue_start = parseInt(map(dataset.property02, 0, 12, 0, 359)); 
    this.hue_end = parseInt(map(dataset.property12, 0, 12, 0, 359)); 
    // Linienstärke
    this.stroke_weight_start = parseInt(map(dataset.property03, 0, 12, 1, 40)); 
    // this.stroke_weight_end = parseInt(map(dataset.property04, 0, 12, 1, 40)); 
    this.stroke_weight_end = 1; 
    // Ausschlag der Partikel, wird in world.js bei Positionierung d. Partikel verwendet
    this.drift = map(dataset.property05, 0, 12, 0, 120);
    // Fühler, wird verwendet in feeler.js
    this.segment_number = Math.ceil(map(dataset.property06, 0, 12, 0, 36));
    this.segment_length = Math.ceil(map(dataset.property07, 0, 12, 0, 120));
    this.brightness_end = Math.ceil(map(dataset.property09, 0, 12, 0, 100));
    this.brightness_start = Math.ceil(map(dataset.property08, 0, 12, 0, 100));
    this.transparency = map(dataset.property10, 0, 12, 0.5, 1);
    this.saturation = Math.ceil(map(dataset.property11, 0, 12, 50, 100));

  };

  // sync representation with original shape
  // to be used after transformation =======
  // =======================================
  this.resetNodes = function() {
    // this.current_hosts = this.original_hosts;
    // return true;
    this.current_hosts = [];
    this.original_hosts = [];
    this.feelers = [];
    for (var i = 0; i < this.anzahl_partikel; i++) {
      var found = false;
      for (var n = 0; n < this.nodes.length; n++) {
        if (i === this.nodes[n]) {
          this.original_hosts.push(i);
          this.current_hosts.push(i);
          this.feelers.push(new Feeler()); // ab wann müssen die Fühler aktiviert werden?
          found = true;
          break;
        }
      }
    }
    this.age = Date.now();
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
        this.feelers.splice((small_gap[2] + 1) % this.current_hosts.length, 1); // wir entfernen auch einen fühler
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
        var new_index = (big_gap[2] + 1) % this.current_hosts.length;
        this.current_hosts.splice(new_index, 0, this.listAllParticles()[this.growing_node["temp_host"]].num);
        this.feelers.splice(new_index, 0, new Feeler());
        //jezt natürlich auch einen neues Segment, gäll
        this.growing_node["pos_in_nodes"] = new_index % this.current_hosts.length; // Welchen Index hat der neue Knoten?
      }
      if (this.growing_node["temp_host"] != this.growing_node["target_host"]) { // new_node ist noch unterwegs
        this.replaceHostRight(this.growing_node["pos_in_nodes"] % this.current_hosts.length);
        this.growing_node["temp_host"] = this.current_hosts[this.growing_node["pos_in_nodes"] % this.current_hosts.length];
        // this.wax bleibt true
        return null;
      } else {
        // console.log("finished growing");
        this.wax = false; // Wachstum beenden
        this.growing_node = null; // Behälter für neuen Knoten leeren
        return null;
      }
    }
  };

  this.listGaps = function() {
    // returns array with
    // - index of host before each gap
    // - gaps between hosts
    // - index in current_hosts 
    // console.log(this.current_hosts.length, this.anzahl_partikel);
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
    // setup feelers
    // =============
    push();
    if (this.feelers.length != this.current_hosts.length) {
      // ob dieser Fall jemals auftritt?
      // könnte obsolet sein
      console.error("Watch out, feelers and nodes not en sync!\nfeelers:", this.feelers.length, "\ncurrent hosts:", this.current_hosts.length);
    }

    var test_feeler = this.feelers[0]; // Ziel: unabhängig von diesem Testfühler werden!!!!  <----------------------
    if (!this.feelers_active && world.transformation_data) { // Verwandlung in Vollzug
      for (var i = 0; i < this.feelers.length; i++) {
        for (var j = 0; j < this.feelers[i]; j++) {
          this.feelers[i][j].growing = false;
        }
      }
    } else if (!this.feelers_active && Date.now() - this.age > 1000) { // kommt das überhaupt vor hier?
      for (var i = 0; i < this.feelers.length; i++) {
        this.feelers_active = true;
        // console.log("feelers active");
      }
    }
    if (this.feelers_active) {
      for (var i = 0; i < this.feelers.length; i++) {
        // feelers[i]addSegment prüft länge, fügt an wenn zu wenig und entfernt wenn zu viel.
        this.feelers[i].addSegment(world.particles[this.current_hosts[i]].pos.x, world.particles[this.current_hosts[i]].pos.y);
        this.feelers[i].update();
      }

    // Verbindungslinien zwischen Fühlersegmenten
    // ==========================================
    // problem --- was passiert bei verwandlungen?
    // es _muss_ möglich sein, alle Fühler einzufahren und erst dann die Verwandlung zu starten
    push();
    if (this.segment_number == this.feelers[0].segments.length) {
      var hue = this.hue_start;
      var sw = this.stroke_weight_start;
      var brightness = this.brightness_start;
      var saturation = this.saturation / this.segment_number;
      var transp = this.transparency / this.segment_number;
      for (var i = this.segment_number - 1; i >= 0; i--) { // wieviele Segmente?
        // was zuerst gezeichnet wird ist auf canvas zuunterst (am weitesten weg)
        // deshalb zuerst die segmente zeichnen, die am weitesten vom ursprungspunkt
        // (d.h. dem host) entfernt sind.
        if (this.brightness_start < this.brightness_end) {
          var bdif = this.brightness_end - this.brightness_start;
          brightness += bdif / (this.segment_number + 1);
        } else {
          var bdif = this.brightness_start - this.brightness_end;
          brightness -= bdif / (this.segment_number + 1);
        }
        // if (frameCount % 60 == 0 && i == 0) {
        //   console.log(brightness);
        // }
        stroke('hsba(' + hue + ', ' + saturation + '%, ' + brightness + '%, ' + transp + ')');
        strokeWeight(sw);
        strokeJoin(ROUND);
        beginShape();
        for (var j = this.current_hosts.length - 1; j >= 0; j--) {
          var cur_particle = world.particles[this.current_hosts[j]];
          if (this.feelers[j].segments[i]) {
            var segment_vector = createVector(this.feelers[j].segments[i].pos.x, this.feelers[j].segments[i].pos.y);
          } else {
            var segment_vector = createVector(0, 0);
            console.log("couldn’t find a segment");
          }
          var segment_position = this.feelers[j].segmentFromOrigin(i+1);
          segment_position.add(cur_particle.pos);
          vertex(segment_position.x, segment_position.y);
          // ellipse(segment_position.x, segment_position.y, 4, 4);
        }
        endShape(CLOSE);
        saturation += this.saturation / this.segment_number;
        transp += this.transparency / this.segment_number;
        if (this.stroke_weight_start < this.stroke_weight_end) {
          // wenn stroke_weight_end hardcoded 1 ist, wird dies kaum je der Fall sein
          var swdif = this.stroke_weight_end - this.stroke_weight_start;
          sw += swdif / this.segment_number; 
        } else {
          var swdif = this.stroke_weight_start - this.stroke_weight_end;
          sw -= swdif / this.segment_number; 
        }
        if (this.hue_start < this.hue_end) {
          var hdif = this.hue_end - this.hue_start;
          sw += hdif / this.segment_number; 
        } else {
          var hdif = this.hue_start - this.hue_end;
          sw -= hdif / this.segment_number; 
        }
      }
    }
    pop();

      // display Feeler
      // ==============
      // for (var i = 0; i < this.feelers.length; i++) {
      for (var i = 0; i < this.feelers.length; i++) {
        var hue = this.hue_start;
        var saturation = this.saturation;
        var brightness = this.brightness_end;
        var transp = this.transparency;
        var origin = createVector(world.particles[this.current_hosts[i]].pos.x, world.particles[this.current_hosts[i]].pos.y);

        if (this.feelers[i].segments.length > 0) {

          if (this.feelers[i].segments) { // Draw curved feeler
            push();
            stroke('hsba(' + this.hue_end + ', ' + saturation + '%, ' + brightness + '%, ' + transp + ')');
            var foo = this.feelers[i].segments;
            var foo_line_origin = createVector(origin.x, origin.y);
            // ellipse(origin.x, origin.y, 4, 4);

            beginShape();
            curveVertex(foo_line_origin.x, foo_line_origin.y);
            curveVertex(foo_line_origin.x, foo_line_origin.y); // 2 x damit die Kurve ausgezogen wird
            for (var k = 0; k < foo.length; k++) {
              var foo_next_vector = foo_line_origin.add(foo[k].pos);
              stroke('hsba(' + this.hue_end + ', ' + saturation + '%, ' + brightness + '%, ' + transp + ')');
              curveVertex(foo_next_vector.x, foo_next_vector.y);

              // Farben reduzieren nützt nichts, die Kurve ist durchgehend
              // saturation -= 50 / foo.length;
              // brightness += 100 / foo.length;
              // transp *= 0.95;
            }
            curveVertex(foo_next_vector.x, foo_next_vector.y); // 2 x damit die Kurve ausgezogen wird
            endShape();

            pop();
          }
          //
          // reset colors
          transp = this.transparency;
          saturation = this.saturation;
          brightness = this.brightness_end;

          // for (var j = 0; j < this.feelers[i].segments.length; j++) { // Draw straight feeler
          //   // stroke(180, 200, 0, transp);
          //   stroke('hsba(' + this.hue + ', ' + saturation + '%, ' + brightness + '%, ' + transp + ')');
          //   // stroke(0, transp);
          //   var line_origin = createVector(origin.x, origin.y);
          //   var next_vector = origin.add(this.feelers[i].segments[j].pos);
          //   line(line_origin.x, line_origin.y, next_vector.x, next_vector.y);
          //   transp -= 250/this.feelers[0].number_of_segments;
          //   // stroke(0, 0, 255, 100);
          //   noFill();
          //   // ellipse(next_vector.x, next_vector.y, 4, 4);
          //   brightness += 100/(this.feelers[i].segments.length - 1);
          //   transp *= 0.98;
          //   saturation -= 50/this.feelers[0].number_of_segments;
          // }
        }
      }
    }
    // line(this.pos.x, this.pos.y, this.feeler.pos.x, this.feeler.pos.y);
    // ellipse(this.feeler.pos.x, this.feeler.pos.y, 4, 4);
    pop();
    // Fühler bis hier …

    // draw active particles
    // if option is set, an ellipsis is drawn around particles
    for (var i = 0; i < this.current_hosts.length; i++) {
      var das_partikel = this.listAllParticles()[this.current_hosts[i]];
      if (das_partikel) {
        das_partikel.display(option);
      } else {
        return null;
      }
    }
    
    // draw polygon (Umrisslinie)
    push();
    // stroke(255, 50, 0);
    stroke('hsba(' + this.hue_end + ', ' + this.saturation + '%, ' + this.brightness_end + '%, ' + this.transparency + ')');
    strokeWeight(this.stroke_weight_end);
    strokeJoin(ROUND);
    beginShape();
    for (var i = 0; i < this.current_hosts.length; i++) {
      // avoid dropping the ball
      // it seems the values in this array don’t get written in time
      // sometimes.
      if (!this.current_hosts[i] && this.current_hosts[i] != 0) { // 0 seems to be falsy !?
        // console.log("dropped a position, for heaven’s sake");
        var pos = createVector(0, 0);
      } else {
        var pos = this.listAllParticles()[this.current_hosts[i]].pos;
      }
      // vertex(pos.x, pos.y);
      if (i == 0) {
        vertex(pos.x, pos.y);
      } else {
        if (this.bezierControlPoints[i]) { // es scheint fälle zu geben, wo nicht alle punkte da sind, wahrsch. während übergang – sollte abgefragt werden, d.h. keine kurven während übergang
          this.bezierControlPoints[i].c1 = this.updateBezierControlPoints(this.bezierControlPoints[i].c1, pos);
          this.bezierControlPoints[i].c2 = this.updateBezierControlPoints(this.bezierControlPoints[i].c2, pos);
        }
        // vertex(pos.x, pos.y);
        // bezierVertex(random(pos.x * 0.75, pos.x * 1.25), random(pos.y * 0.75, pos.y * 1.25), random(pos.x * 0.75, pos.x * 1.25), random(pos.y * 0.75, pos.y * 1.25), pos.x, pos.y);
        var bcp = this.bezierControlPoints[i] || {c1: world.particles[world.particles.length] || createVector(0, 0), c2: world.particles[random(world.particles.length)] || createVector(0, 0)};
        bezierVertex(bcp.c1.x, bcp.c1.y, bcp.c2.x, bcp.c2.y, pos.x, pos.y);

      }
    }
    // Form schliessen
    pos = this.listAllParticles()[this.current_hosts[0]].pos;
    this.bezierControlPoints[0].c1 = this.updateBezierControlPoints(this.bezierControlPoints[0].c1, pos);
    this.bezierControlPoints[0].c2 = this.updateBezierControlPoints(this.bezierControlPoints[0].c2, pos);
    // bezierVertex(random(pos.x * 0.75, pos.x * 1.25), random(pos.y * 0.75, pos.y * 1.25), random(pos.x * 0.75, pos.x * 1.25), random(pos.y * 0.75, pos.y * 1.25), pos.x, pos.y);
    bezierVertex(this.bezierControlPoints[0].c1.x, this.bezierControlPoints[0].c1.y, this.bezierControlPoints[0].c2.x, this.bezierControlPoints[0].c2.y, pos.x, pos.y);
    endShape();
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

  // Hilfsfunktion zum fliessenden Übergang zwischen Positionen der Bezier-Kontrollpunkte
  // nimmt einen VektorKontrollpunkt und die Position eines Hosts (ebenfalls Vektor)
  // und liefert einen neuen Vektor, mit dem der Kontrollpunkt überschrieben werden kann
  this.updateBezierControlPoints = function(v1, v2) {
  if (dist(v1.x, v1.y, v2.x, v2.y) > 50) {
    w = createVector((v1.x - v2.x) * 0.1, (v1.y - v2.y) * 0.1);
  } else {
    w = createVector(Math.random()*2 - 1, Math.random()*2 - 1);
  }
  v1.sub(w);
  return v1;
  }
  
  this.normalizeBezierControlPoints = function() {
    for (var i = 0; i < this.bezierControlPoints.length; i++) {
      var target = world.particles[this.current_hosts[i]];
      var c1 = this.bezierControlPoints[i].c1;
      var c2 = this.bezierControlPoints[i].c2;
      
      // normalize c1
      if (dist(c1, target > 1)) {
        var pointer = target.sub(c1);
        pointer.mult(0.1);
        this.bezierControlPoints[i].c1.add(pointer);
        return; 
      }
      // normalize c2
      if (dist(c2, target > 1)) {
        var pointer = target.sub(c2);
        pointer.mult(0.1);
        this.bezierControlPoints[i].c2.add(pointer);
        return; 
      }
    }
  }
}
