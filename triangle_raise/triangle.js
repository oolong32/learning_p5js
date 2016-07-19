function Triangle ( x, y, limit ) {

  /* This is broken as it is right now */

  // define upper left corner of raster field
  this.reference = createVector( x, y );

  // define lower right corner of raster field
  this.limit = createVector( x + limit, y + limit );

  // random factor to alter perlin noise with
  this.randomFactor = Math.floor( random( 1, 6 ) );

  // define boudaries, or where the points may wander
  this.p1_bgn = createVector( this.reference.x + ( this.limit.x - this.reference.x ) * 0.25, this.reference.y + ( this.limit.y - this.reference.y ) * 0.1 );
  this.p1_end = createVector( this.reference.x + ( this.limit.x - this.reference.x ) * 0.75, this.reference.x + ( this.limit.y - this.reference.y ) * 0.25 );

  this.p2_bgn = createVector( this.reference.x + ( this.limit.x - this.reference.x ) * 0.6, this.reference.y + ( this.limit.y - this.reference.y ) * 0.6 );
  this.p2_end = createVector( this.reference.x + ( this.limit.x - this.reference.x ) * 0.9, this.reference.x + ( this.limit.y - this.reference.y ) * 0.9 );

  this.p3_bgn = createVector( this.reference.x + ( this.limit.x - this.reference.x ) * 0.1, this.reference.y + ( this.limit.y - this.reference.y ) * 0.6 );
  this.p3_end = createVector( this.reference.x + ( this.limit.x - this.reference.x ) * 0.3, this.reference.x + ( this.limit.y - this.reference.y ) * 0.9 );

  // draw three points within the raster field
  this.P1 = createVector( random( this.p1_bgn.x, this.p1_end.x, this.p1_bgn.y, this.p1_end.y ) );
  this.P2 = createVector( random( this.p2_bgn.x, this.p2_end.x, this.p2_bgn.y, this.p2_end.y ) );
  this.P3 = createVector( random( this.p3_bgn.x, this.p3_end.x, this.p3_bgn.y, this.p3_end.y ) );

  // copies to modify (keep original values constant)
  this.p1 = createVector( this.P1.x, this.P1.y );
  this.p2 = createVector( this.P2.x, this.P2.y );
  this.p3 = createVector( this.P3.x, this.P3.y );

  // color
  this.r = Math.floor( random( 256 ) );
  this.g = Math.floor( random( 256 ) );
  this.b = Math.floor( random( 256 ) );

  // display the triangle
  this.display = function() {
    push();
    noFill();
    stroke( 255, 80, 0 );
    rect( this.reference.x, this.reference.y, this.limit.x - this.reference.x, this.limit.y - this.reference.y );
    pop();

    push();
    // fill( this.r, this.g, this.b );
    // noStroke();
    stroke( 0, 80, 255 );
    triangle( this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y );
    pop();
  };

  // move the three points
  this.redraw = function( xoff ) {
    // map perlin noise to corners
    this.p1.x = map( noise( xoff ), 0, 1, this.p1_bgn.x, this.p1_end.x );
    this.p1.y = map( noise( xoff ), 0, 1, this.p1_bgn.y, this.p1_end.y );

    this.p2.x = map( noise( xoff ), 0, 1, this.p2_bgn.x, this.p2_end.x );
    this.p2.y = map( noise( xoff ), 0, 1, this.p2_bgn.y, this.p2_end.y );

    this.p3.x = map( noise( xoff ), 0, 1, this.p3_bgn.x, this.p3_end.x );
    this.p3.y = map( noise( xoff ), 0, 1, this.p3_bgn.y, this.p3_end.y );
  }

  // raise the triangle
  this.raise = function() {
    this.reference.y -= 1;
    this.limit.y -= 1;
  }

  // check triangle position – are we still below the top border?
  this.belowTop = function() {
    return this.limit.y > 0;
  }
}
