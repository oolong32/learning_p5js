// kopie Zustand wie in
// Coding Rainbow Live #46: Perlin Noise and Flow Fields, 2:01:50
// https://youtu.be/sor1nwNIP9A

var inc = 0.1;
var scl = 10;
var cols, rows;

// check framerate
var fr;

function setup() {
  createCanvas( 200, 200 );
  pixelDensity( 1 ); // ignore retina display density
  cols = floor( width / scl );
  rows = floor( height / scl );

  fr = createP('');
}

function draw() {
  background( 255 );
  randomSeed(10);

  var yoff = 0;
  for ( var y = 0; y < rows; y++ ) {
    var xoff = 0;
    for ( var x = 0; x < cols; x++ ) {
      var index = ( x + y * width ) * 4 ;
      var r = noise( xoff, yoff ) * 255;
      var v = p5.Vector.fromAngle( random( 2*PI )); 
      xoff += inc;
      noFill();
      stroke( 0 );
      push();
      translate( x * scl, y * scl );
      rotate( v.heading());
      line( 0, 0, scl, 0 );

      pop();
    }
    yoff += inc;
  }

  fr.html(floor(frameRate()));
}
