function Blob( x, y ) {
  // fill in from agar.io;
  this.pos = createVector( x, y );
  this.r = 50;
  var yoff = 0;
  this.display = function() {
    push();
    translate( this.pos.x, this.pos.y );
    beginShape();
    var xoff = 0;
    for ( var a = 0; a < TWO_PI; a += 0.1 ) {
      // var r = this.r + random( -5, 5 );
      var offset = map( noise( xoff, yoff ), 0, 1, -10, 10 );
      var r = this.r + offset;
      var x = r * cos( a );
      var y = r * sin( a );
      vertex( x, y );
      xoff += 0.1;
    }
    // the shape doesn’t close very nicely, because the perlin noise at the end of the circle doesn’t match the value at the start of the circle. could be fixed by THINKING about it.
    endShape( CLOSE );
    pop();
    yoff += 0.01;
  }
  
}
