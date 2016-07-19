// set raster and margin/gutter
var FIELD = 120;
var MARGIN = 4;

// there’s a strip with ( width / FIELD ) number of fields beneath the lower edge of the canvas
var numberOfFields;
var numberOfGutters;
// a point of origin on the left side, that is symmetrical to the edge of the rightmost field
var x_origin;

// store triangle objects in an array
var triangles = [];

// perlin noise offset
var xoff = 0;

function generateTriangle() {
  // random field to place a triangle in
  var offset = Math.floor( random( 0, numberOfFields ) );
  var x = x_origin + ( offset * ( FIELD + MARGIN ) );
  var y = height + FIELD;
  triangles.push( new Triangle( x, y, FIELD ) );
  // console.log( "generate triangle at x = " + x );
}

function checkColumns() {
  // check columns
  push();
  noFill();
  stroke( 255, 100, 0 );
  for ( var x = x_origin; x < width - FIELD; x += ( MARGIN + FIELD ) ) {
    line( x, height, x, 0 );
  }
  // mark right side of columns
  for ( var x = x_origin + FIELD; x < width; x += ( MARGIN + FIELD ) ) {
    line( x, height, x, 0 );
  }
  pop();
}

function mouseClicked() {
  generateTriangle();
}

function setup() {
  createCanvas( 500, 500 );
  frameRate( 40 );

  // how many fields can we draw?
  numberOfFields = Math.floor( ( width ) / ( FIELD + MARGIN ) );
  numberOfGutters = numberOfFields - 1; // don’t add one too many on the right side
  // where do we start drawing, or how much space is left on the edges?
  x_origin = ( width - ( numberOfFields * FIELD + numberOfGutters * MARGIN ) ) / 2;
}

function draw() {
  background( 0 );
  // stroke( 255 );
  noFill();
  // checkColumns();

  if ( triangles.length > 0 ) {

    var i = triangles.length - 1;
    for ( ; i >= 0; i-- ) { // iterate end to start, because we’re going to splice what’s out of the canvas
      // triangles[ i ].redraw( xoff + i * 10 ); // xoff should not be altered with i – it makes the animation jumpy, when triangles.length changes
      triangles[ i ].redraw( xoff * triangles[ i ].randomFactor );
      triangles[ i ].raise();
      triangles[ i ].display();
      // get rid of what’s not visible anymore
      if ( !triangles[ i ].belowTop() ) {
        triangles.splice( i, 1 );
      }
    }

  }
  xoff += 0.005;
}
