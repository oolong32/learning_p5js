// Phyllotaxis on Wikipedia: https://en.wikipedia.org/wiki/Phyllotaxis
// Algorithmic Botany - Phyllotaxis: http://algorithmicbotany.org/papers/abop/abop-ch4.pdf

var n = 0;
var c = 4;

function setup() {
  createCanvas( 400, 400 );
  background( 0 );
  angleMode( DEGREES );
  colorMode( HSB );
}

function draw() {
  var a = n * 137.5;
  var r = c * sqrt( n );

  var x = r * cos( a ) + width / 2;
  var y = r * sin( a ) + height / 2;

  noStroke();
  fill( a % 200, 255, 255 );
  ellipse( x, y, 4, 4 );

  n += 1;
}
