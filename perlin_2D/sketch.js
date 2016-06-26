var inc = 0.01;

function setup() {
  createCanvas( 200, 200 );
  pixelDensity( 1 ); // ignore retina display density
}

function draw() {
  loadPixels();
  background( 51 );

  var yoff = 0;
  for ( var x = 0; x < width; x++ ) {
    var xoff = 0;
    for ( var y = 0; y < height; y++ ) {
      var index = ( x + y * width ) * 4 ;
      // var r = random( 255 );
      var n = map( noise( xoff, yoff ), 0, 1, 0, 255 ) ;
      pixels[ index + 0 ] = n;
      pixels[ index + 1 ] = n;
      pixels[ index + 2 ] = n;
      pixels[ index + 3 ] = 255;
      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
}
