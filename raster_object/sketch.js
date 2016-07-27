/* blank raster to draw in */
/* two ways of iterating over the fields in the raster */

var field_x; // width of single raster field
var field_y; // height of single raster field
var margin_x; // width horizontal margins
var margin_y; // height of vertical margins
var num_fields_x; // number of rasterfields on x axis
var num_fields_y; // number of raster fields on y axis
var foos = [];


function setup() {
  createCanvas( 400, 300 );
  background( 51 );
  // set single field in raster
  field_x = 24;
  field_y = 24;
  // calculate horizontal side margins
  margin_x = width % field_x / 2;
  // calculate vertical side margins
  margin_y = height % field_y / 2;

  // for loop with field values
  for ( var y = margin_y; y < height - margin_y; y += field_y ) {
    for ( var x = margin_x; x < width - margin_x; x += field_x  ) {
      stroke( 255 );
      noFill();
      foos.push( new Foo( x, y, field_x, field_y ) );
    }
  }

  // for loop with number of fields
  num_fields_x = ( width - margin_x * 2 ) / field_x;
  num_fields_y = ( height - margin_y * 2 ) / field_y;
  for ( var j = 0; j < num_fields_y; j++ ) {
    for ( var l = 0; l < num_fields_x; l++ ) {
      push();
      noStroke();
      fill( 0, 200, 255 );
      translate( margin_x, margin_y );
      rect( l * field_x + 1, j * field_y + 1, field_x - 1, field_y - 1 );
      pop();
    }
  }
}

function draw() {
  background( 0 );
  // for loop with field values
  for ( var y = margin_y; y < height - margin_y; y += field_y ) {
    for ( var x = margin_x; x < width - margin_x; x += field_x  ) {
      stroke( 255 );
      noFill();
      rect( x, y, field_x, field_y );
    }
  }
  for ( var i = 0; i < foos.length; i++ ) {
    foos[ i ].update();
    foos[ i ].out();
    foos[ i ].display();
  }
}
