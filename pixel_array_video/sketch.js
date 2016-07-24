var video;

function setup() {
  createCanvas( 320, 240 ); 
  pixelDensity( 1 ); // because retina screen
  video = createCapture( VIDEO );
  video.size( 320, 240 );
}

function draw() {
  background( 51 );
  video.loadPixels();
  loadPixels();

  for ( var y = 0; y < height; y += 1 ) {
    for ( var x = 0; x < width; x += 1 ) {
      var index = ( y * width + x ) * 4;
      var r = video.pixels[ index + 0 ];
      var g = video.pixels[ index + 1 ];
      var b = video.pixels[ index + 2 ];

      // pixels[ index + 0 ] = video.pixels[ index + 0 ];
      // pixels[ index + 1 ] = video.pixels[ index + 1 ];
      // pixels[ index + 2 ] = video.pixels[ index + 2 ];
      var bright = ( r + g + b ) / 3;
      pixels[ index + 0 ] = bright;
      pixels[ index + 1 ] = bright;
      pixels[ index + 2 ] = bright;
      pixels[ index + 3 ] = 255; // alpha
    }
  }
  updatePixels();
}
