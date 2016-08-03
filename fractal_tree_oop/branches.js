function Branch( begin, end ) {
  this.begin = begin;
  this.end = end;
  this.grown = false;

  this.show = function() {
    stroke( 255 );
    line( this.begin.x, this.begin.y, this.end.x, this.end.y );
  }

  this.jitter = function() {
    this.end.x += random( -1, 1 );
    this.end.y += random( -1, 1 );
  }
  this.branchA = function() {
    var dir = p5.Vector.sub( this.end, this.begin );
    var v = random( 3, 7 );
    dir.rotate( PI / v );
    dir.mult( 0.67 );
    var newEnd = p5.Vector.add( this.end, dir );
    var a = new Branch( this.end, newEnd )
    return a;
  }

  this.branchB = function() {
    var dir = p5.Vector.sub( this.end, this.begin );
    var v = random( 3, 7 );
    dir.rotate( -PI / v );
    dir.mult( 0.67 );
    var newEnd = p5.Vector.add( this.end, dir );
    var b = new Branch( this.end, newEnd )
    return b;
  }
}
