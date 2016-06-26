var start = 0;
var inc = 0.001;

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
    y = noise( xoff );
    vertex( x, map( y, 0, 1, 0, height ));
    xoff += inc;
  }

  endShape();
  start += inc;

}
