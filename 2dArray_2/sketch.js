var matrix;

function create2d_array( rows, cols ) {
  var arr = new Array( rows );
  for ( var i = 0; i < arr.length; i++ ) {
    arr[ i ] = new Array( cols );
  }
  return arr;
}

function setup() {
  createCanvas( 50, 50 );
  matrix = create2d_array( 5, 5 );
  noStroke();

  var cl = matrix.length;
  for (var r = 0; r < cl; r++ ) {
    var rl = matrix[ r ].length;
    for ( var c = 0; c < rl; c++ ) {
      matrix[ r ][ c ] = new Cell( c * 10, r * 10, 10, 10, r + c );
    }
  }
}

function draw() {
  background( 51 );
  var cl = matrix.length;
  for (var y = 0; y < cl; y++ ) {
    var rl = matrix[ y ].length;
    for ( var x = 0; x < rl; x++ ) {
      current_cell = matrix[ y ][ x ];
      current_cell.oscillate();
      current_cell.display();
    }
  }
}

function Cell( x, y, w, h, angle) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.angle = angle;

  this.oscillate = function() {
    this.angle += 0.02;
  };

  this.display = function() {
    fill( 127 + Math.floor( 127 * sin( this.angle ) ) );
    rect( this.x, this.y, this.w, this.h );
  };
}
