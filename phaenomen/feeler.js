function Feeler(x, y) {
  this.ready = false;
  this.segments = [];
  this.number_of_segments = 10;

  /*
   * ein Fühler ist eine Sammlung aus Vektoren.
   * diese Vektoren bilden eine Kette
   * sie entwachsen einem Partikel/Host (oder einem Knoten?)
   * sie beginnen zu wachen, wenn sie genug Zeit haben.
   *
   */

  this.whatTimeIsIt = function() {
    var t = new Date();
    var now = t.getTime();
    var then = world.active_phenomenon.timestamp;
    var age_of_phenomenon = (now - then) / 1000;
    if (age_of_phenomenon > 1) {
      this.ready = true;
    }
    return(age_of_phenomenon);
  };

  this.addSegment = function() {
    if ((this.whatTimeIsIt() / this.number_of_segments) > 2) {
      var segment = createVector(0, 0);
      // this.segments.push(segment);
      this.segments.unshift(segment);
      console.log("add one");
      if (this.segments.length > this.number_of_segments) {
        // überzählige segmente löschen
        this.segments.splice(0, 1);
        console.log("delete one");
      }
    }
  };

  this.update = function() {
    for (var i = 0; i < this.segments.length; i++) {
      this.growSegment(this.segments[i]);
    }
  };

  this.growSegment = function(s) {
    s.x += Math.random() * 2 - 1;
    s.y += Math.random() * 2 - 1;
  }
}

