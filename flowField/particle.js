function Particle () {

  this.pos = createVector( random( width ), random( height ));
  this.vel = createVector( 0, 0 );
  this.acc = createVector( 0, 0 );
  this.maxspeed = 2;

  // store previous position in order to get nicer lines
  // otherwise whitespace between dots, because dots faster than framerate
  this.prevPos = this.pos.copy();

  this.update = function () {
    this.vel.add( this.acc );
    this.vel.limit( this.maxspeed );
    this.pos.add( this.vel );
    this.acc.mult( 0 );
  }

  this.applyForce = function ( force ) {
    this.acc.add( force );
  }

  this.show = function () {
    stroke( 0, 5 );
    strokeWeight(1);
    // point( this.pos.x, this.pos.y );
    // we draw a line instead of a point (see variable this.prevPos)
    line( this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y );
    // update previous Position, to get continuous lines
    // if this is omitted, the lines are always drawn to the
    // initial position of the dot.
    this.updatePrev();
  }

  this.updatePrev = function () {
    // adjust edges function to prevent drawing of lines across the canvas
    // when dots leave the screen limits and reappear on the opposite side
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function () {
    if ( this.pos.x > width ) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if ( this.pos.x < 0 ) {
      this.pos.x = width;
      this.updatePrev();
    }
    if ( this.pos.y > height ) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if ( this.pos.y < 0 ) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  this.follow = function ( vectors ) {
    var x = floor( this.pos.x / scl );
    var y = floor( this.pos.y / scl );
    var index = x + y * cols;
    var force = vectors[ index ];
    this.applyForce( force );
  }

}
