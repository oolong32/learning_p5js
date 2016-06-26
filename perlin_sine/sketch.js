var start = 0;
var inc = 0.01;

function setup() {
  createCanvas( 400,300 );
}

function draw() {
  background( 51 );

  beginShape();
  var xoff = start;

  for ( var x = 0; x < width; x++ ) {
    stroke( 255 );
    noFill();
    var n = map( noise( xoff ), 0, 1, -50, 50 )
    var s = map( sin( xoff ) , -1, 1, 0, height );
    var y = n + s;
    vertex( x, y );
    xoff += inc;
  }

  endShape();
  start += inc;

}
