var grid;
var next;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;

function setup() {
  createCanvas( 200, 200 );
  pixelDensity( 1 );
  grid = [];
  next = [];
  for ( var y = 0; y < height; y++ ) {
    grid[ y ] = [];
    next[ y ] = [];
    for ( var x = 0; x < width; x++ ) {
      grid[ y ][ x ] = { a: random( 1 ), b: random( 1 ) };
      next[ y ][ x ] = { a: 0, b: 0 };
    }
  }
}

function draw() {
  background( 111 );

  for ( var y = 0; y < height; y++ ) {
    for ( var x = 0; x < height; x++ ) {
      var na = next[ y ][ x ].a;
      var ga = grid[ y ][ x ].a;
      var nb = next[ y ][ x ].b;
      var gb = grid[ y ][ x ].b;
      // formula as in http://karlsims.com/rd.html
      na = ga + ( dA * laplaceA( y, x) ) - ( ga * gb * gb ) + ( feed * ( 1 - ga ) ); 

      nb = gb + ( dB * laplaceB( y, x) ) - ( ga * gb * gb ) - ( ( k + feed ) * gb ); 
    }
  }

  loadPixels();
  for ( var y = 0; y < height; y++ ) {
    for ( var x = 0; x < height; x++ ) {
      pix = ( x + y * width ) * 4;
      pixels[ pix + 0 ] = floor( next[ y ][ x ].a * 255);
      pixels[ pix + 1 ] = 0;
      pixels[ pix + 2 ] = floor( next[ y ][ x ].b * 255 );
      pixels[ pix + 3 ] = 255;
    }
  }

  updatePixels();
  swap();
}

function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}

function laplaceA( y, x) {
  var sumA = 0;
  sumA += grid[ y ][ x ].a * -1;
  sumA += grid[ y ][ x + 1 ].a * 0.2;
  sumA += grid[ y ][ x - 1 ].a * 0.2;
  sumA += grid[ y + 1 ][ x ].a * 0.2;
  sumA += grid[ y - 1 ][ x ].a * 0.2;
  sumA += grid[ y + 1 ][ x + 1 ].a * 0.05;
  sumA += grid[ y - 1 ][ x - 1 ].a * 0.05;
  sumA += grid[ y + 1 ][ x - 1 ].a * 0.05;
  sumA += grid[ y - 1 ][ x + 1 ].a * 0.05;
  return sumA;
}

function laplaceB( y, x) {
  var sumB = 0;
  sumB += grid[ y ][ x ].b * -1;
  sumB += grid[ y ][ x + 1 ].b * 0.2;
  sumB += grid[ y ][ x - 1 ].b * 0.2;
  sumB += grid[ y + 1 ][ x ].b * 0.2;
  sumB += grid[ y - 1 ][ x ].b * 0.2;
  sumB += grid[ y + 1 ][ x + 1 ].b * 0.05;
  sumB += grid[ y - 1 ][ x - 1 ].b * 0.05;
  sumB += grid[ y + 1 ][ x - 1 ].b * 0.05;
  sumB += grid[ y - 1 ][ x + 1 ].b * 0.05;
  return sumB;
}
