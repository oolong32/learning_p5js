var grid;
var next;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;
// values according to http://karlsims.com/rd.html

function setup() {
  createCanvas( 200, 200 );
  pixelDensity( 1 );
  grid = [];
  next = [];
  for ( var y = 0; y < height; y++ ) {
    grid[ y ] = [];
    next[ y ] = [];
    for ( var x = 0; x < width; x++ ) {
      grid[ y ][ x ] = { a: 1, b: 0 };
      next[ y ][ x ] = { a: 1, b: 0 };
    }
  }

  for ( var i = 100; i < 110; i++ ) {
    for ( var j = 100; j < 110; j++ ) {
      // pour some chemicals into the petri dish
      grid[ i ][ j ].b = 1;
    }
  }
}

function draw() {
  background( 111 );

  // don’t do the edges, otherwise there will be errors when checking the edges
  for ( var y = 1; y < height - 1; y++ ) {
    for ( var x = 1; x < width - 1; x++ ) {
      var ga = grid[ y ][ x ].a;
      var gb = grid[ y ][ x ].b;
      // formula as in http://karlsims.com/rd.html
      next[y][x].a = ga + ( dA * laplaceA( y, x) ) - ( ga * gb * gb ) + ( feed * ( 1 - ga ) ); 
      next[y][x].b = gb + ( dB * laplaceB( y, x) ) + ( ga * gb * gb ) - ( ( k + feed ) * gb ); 
      next[ y ][ x ].a = constrain(next[ y ][ x ].a, 0, 1);
      next[ y ][ x ].b = constrain(next[ y ][ x ].b, 0, 1);
    }
  }

  loadPixels();
  for ( var y = 0; y < height; y++ ) {
    for ( var x = 0; x < width; x++ ) {
      pix = ( x + y * width ) * 4;
      var a = next[ y ][ x ].a;
      var b = next[ y ][ x ].b;
      var c = floor( ( a - b ) * 255 );
      pixels[ pix + 0 ] = c;
      pixels[ pix + 1 ] = c;
      pixels[ pix + 2 ] = c;
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
