function Feeler(x, y) {
  this.ready = false;
  this.segments = [];
  this.number_of_segments = (segment_slider) ? segment_slider.value() : 20;
  this.max_length_of_segments = 50;

  /*
   * ein Fühler ist eine Sammlung aus Vektoren.
   * diese Vektoren bilden eine Kette
   * sie entwachsen einem Partikel/Host (oder einem Knoten?)
   * sie beginnen zu wachen, wenn sie genug Zeit haben.
   *
   * Vielleicht braucht es
   * - eine Beschränkung der Segment-Länge
   * - eine Methode zum Einziehen der Fühler
   *
   * Sind die Fühler Eigenschaft der Partikel/Hosts?
   * Wäre es nicht besser, sie gehörten zu den Knoten?
   */

  this.whatTimeIsIt = function() {
    var t = new Date();
    var now = t.getTime();
    var then = world.active_phenomenon.age;
    var age_of_phenomenon = (now - then) / 100;
    if (!this.ready && age_of_phenomenon > 4) {
      this.ready = true; // Feeler can start doing it’s thing
    }
    return(age_of_phenomenon);
  };

  this.addSegment = function() {
    // die segmente sollen langsamer dazu kommen, waht to do?
    if ((this.whatTimeIsIt() / this.number_of_segments) > 3) {
      var segment = {
        pos: createVector(0, 0),
        growing: true
      };
      // this.segments.push(segment);
      this.segments.unshift(segment);
      if (this.segments.length > this.number_of_segments) {
        // überzählige segmente löschen
        this.segments.splice(0, 1);
      }
    }
  };

  this.update = function() {
    for (var i = 0; i < this.segments.length; i++) {
      var segment = this.segments[i];
      if (segment.growing) {
        this.growSegment(segment);
      } else {
        this.shrinkSegment(segment);
      }
    }
  };

  this.shrinkSegment = function(s) {
    s.pos.mult(0.9);
    if (s.pos.mag() < 1) {
      s.growing = true;
    }
  }

  this.growSegment = function(s) {
    s.pos.x += Math.random() * 2 - 1;
    s.pos.y += Math.random() * 2 - 1;
    if (s.pos.mag() > this.max_length_of_segments) {
      s.growing = false;
    }
  }
}

