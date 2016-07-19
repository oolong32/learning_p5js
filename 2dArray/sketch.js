function create2d_array( cols, rows ) {
  var arr = new Array( cols );
  for ( var i = 0; i < arr.length; i++ ) {
    arr[ i ] = new Array( rows );
  }
  return arr;
}

function setup() {
  createCanvas( 400, 300 );
  background( 51 );

  var matrix = create2d_array( 40, 30 );
  var ml = matrix.length;
  for (var x = 0; x < ml; x++ ) {
    var rl = matrix[ x ].length;
    for ( var y = 0; y < rl; y++ ) {
      push();
      fill( random( 256 ) );
      rect( x * 10, y * 10, 10, 10);
      pop();
    }
  }
}

function draw() {

}
