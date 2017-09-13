function Feeler(x, y) {
  this.ready = false;
  this.segments = [];
  this.number_of_segments = 0;
  this.max_length_of_segments = 0;

  /*
   * ein Fühler ist eine Sammlung aus Vektoren.
   * diese Vektoren bilden eine Kette
   * sie entwachsen einem Partikel/Host (oder einem Knoten?)
   * sie beginnen zu wachsen, wenn sie genug Zeit haben.
   *
   * Vielleicht braucht es
   * - eine Beschränkung der Segment-Länge
   * - eine Methode zum Einziehen der Fühler   <------------------------------------ YES!
   *
   */

  this.addSegment = function() { // fügt dem Fühler ein Segment hinzu
    var num = world.active_phenomenon ? world.active_phenomenon.segment_number : this.number_of_segments;
    if (this.segments.length < num && frameCount % 10 === 0) { // steuert Geschwindigkeit des Aufbaus
      var segment = {
        pos: createVector(0, 0),
        growing: true
      };
      this.segments.unshift(segment);
      return;
    } else {
      // all is well
      return;
    }
  };

  this.update = function() { // kontrolliert Wachstum der Segmente
    for (var i = 0; i < this.segments.length; i++) {
      var segment = this.segments[i];
      if (segment.growing) {
        this.growSegment(segment);
      } else {
        this.retractSegment(segment);
      }
    }
    return;
  };

  this.retractSegment = function(s) { // verkürzt Segment, bis es kleiner als 1 ist.
    // ein furchtbarer Verdacht: passiert das überhaupt?
    // ein furchtbarer Verdacht: passiert das überhaupt?
    // ein furchtbarer Verdacht: passiert das überhaupt?
    // ein furchtbarer Verdacht: passiert das überhaupt?
    // ein furchtbarer Verdacht: passiert das überhaupt?
    // TESTEN mit bedeutend kleinerem Faktor (September)
    // ein furchtbarer Verdacht: passiert das überhaupt?
    // ein furchtbarer Verdacht: passiert das überhaupt?
    // ein furchtbarer Verdacht: passiert das überhaupt?
    // ein furchtbarer Verdacht: passiert das überhaupt?
    // ein furchtbarer Verdacht: passiert das überhaupt?
    s.pos.mult(0.99);
    if (s.pos.mag() < 1) {
      s.growing = true;
    }
    return;
  };

  this.growSegment = function(s) { // verlängert Segment, bis es «ausgewachsen» ist
    var factor = 4;
    s.pos.x += Math.random()*factor - factor/2;
    s.pos.y += Math.random()*factor - factor/2;
    var max_length = world.active_phenomenon ? world.active_phenomenon.segment_length : this.max_length_of_segments;
    if (s.pos.mag() > max_length) {
      s.growing = false;
    }
    return;
  };

  this.segmentFromOrigin = function(i) { // Returns Vector from origin to single segment’s tip.
    var pointer = createVector(0, 0);
    if (i > this.segments.length) {
      console.error('There are not as many segments in this feeler\nRequested:', i + '\nActual number of segments:', world.active_phenomenon.segment_number);
      // das ist noch nicht ausgereift und führt zu unterbruch.
      // prüfen, sobald die werte aus einer json.datei kommen statt vom regler.
      // und vor allem, sobald diese blöde zeitabhängige initialisierung gelöst ist.
      return pointer; // Nullvektor
    } else {
      for (var j = 0; j < i; j++) {
        pointer.add(this.segments[j].pos);
      }
    }
    return pointer;
  };
}
