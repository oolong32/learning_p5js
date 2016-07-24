var video;
var vScale = 16;

function setup() {
  createCanvas( 640, 480 ); 
  pixelDensity( 1 ); // because retina screen
  video = createCapture( VIDEO );
  video.size( width / vScale, height / vScale );
}

function draw() {
  background( 51 );
  video.loadPixels();

  for ( var y = 0; y < video.height; y += 1 ) {
    for ( var x = 0; x < video.width; x += 1 ) {
      // var index = ( y * video.width + x ) * 4;
      // flip image
      var index = ( video.width - ( x + 1 ) + y * video.width ) * 4;
      var r = video.pixels[ index + 0 ];
      var g = video.pixels[ index + 1 ];
      var b = video.pixels[ index + 2 ];

      var bright = ( r + g + b ) / 3;

      // draw rectangles with size relative to the brightness fo the video pixels
      var w = map( bright, 0, 255, 0, vScale );
      fill( bright );
      rectMode( CENTER );
      rect( x * vScale, y * vScale, w, w );
    }
  }
}
