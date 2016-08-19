function Walker( x, y, stuck ) {

  this.stuck = stuck; // no argument = falsy

  if ( x != undefined && y != undefined ) {
    this.pos = createVector( x, y );
  } else {
    this.pos = randomPoint();
  }

  function randomPoint() {
    // pick floor, right, bottom, left
    var i = floor( random( 4 ) );
    if ( i == 0 ) { // top
      var x = random( width );
      return createVector( x, height );
    } else if ( i == 1 ) { // right
      var y = random( height );
      return createVector( width, y );
    } else if ( i == 2 ) { // bottom
      var x = random( width );
      return createVector( x, 0 );
    } else { // left
      var y = random( height );
      return createVector( 0, y );
    }
  }

this.walk = function() {
    var vel = p5.Vector.random2D();
    this.pos.add( vel );
    this.pos.x = constrain( this.pos.x, 0, width );
    this.pos.y = constrain( this.pos.y, 0, height );
  }

  this.checkStuck = function( others ) {
    var ol = others.length;
    for ( var i = 0; i < ol; i++ ) {
      // var d = p5.Vector.dist( this.pos, others[ i ].pos ); // dist function uses to much resources here
      var d = distSq( this.pos, others[ i ].pos );
      // if ( d < r * 2 ) {
      if ( d < ( r * r * 4 ) ) {
        this.stuck = true;
        return true;
        break;
      }
    }
    return false;
  }

  this.show = function() {
    if ( this.stuck ) {
      fill( 0, 255, 100 );
    } else {
      fill( 255 );
    }
    ellipse( this.pos.x, this.pos.y, r * 2, r * 2 );
  }

  function distSq( a, b ) { // write own dist function to speed up things
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    // return sqrt( dx * dx - dy * dy ); // euclidian distance computation
    return dx * dx + dy * dy;
  }

}
