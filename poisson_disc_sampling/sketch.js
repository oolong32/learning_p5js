// Dan Shiffman, Poisson Disc Sampling
// https://youtu.be/flQgnCUxHlw
// http://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf
// https://www.jasondavies.com/poisson-disc/

var r = 10;  // smallest distance between points
var k = 30; // max times to try
var w = r / Math.sqrt( 2 ); // 2 because 2 dimensions
var grid = [];
var active = [];
var cols, rows;

function setup() {
  createCanvas( 400, 400 );
  strokeWeight( 4 );

  // STEP 0: Fill grid with nothing
  cols = floor( width / w );
  rows = floor( height / w );
  for ( var i = 0; i < cols * rows; i++ ) { // initialize grid
    grid[ i ] = undefined; // nothing in grid
  }

  // STEP 1: create random point
  var x = random( width );
  var y = random( height );
  var c = floor( x / w );   // column containing the point
  var r = floor( y / w );   // row containing the point
  var pos = createVector( x, y );
  var index = c + r * cols; // index of field containing the point
  grid[ index ] = pos;
  active.push( pos );
}

function draw() {
  background( 0 );

  // STEP 2: 
  if ( active.length > 0 ) { // if animates
  // while ( active.length > 0 ) { // while is instant
    var randIndex = floor( random( active.length ) ); 
    var pos = active[ randIndex ];
    var found = false;
    for ( n = 0; n < k; n++ ) {
      var sample = p5.Vector.random2D(); // create random vector
      var m = random( r, 2 * r ); // set magnitude
      sample.setMag( m );
      sample.add( pos );

      // where is the point in the grid?
      var cc = floor( sample.x / w );
      var rr = floor( sample.y / w );

      // check if there’s not already something there
      // and if we’re not off screen
      if ( cc > -1 && rr > -1 && cc < cols && rr < rows && !grid[ cc + rr * cols ] ) {
        
          var ok = true;
          for ( var i = -1; i <= 1; i++ ) {
            for ( var j = -1; j <= 1; j++ ) {
              var index = ( cc + i ) + ( rr + j ) * cols;
              var neighbour = grid[ index ];
              if ( neighbour ) {
                var d = p5.Vector.dist( sample, neighbour );
                if ( d < r ) { // too close
                  ok = false;
                }
              }
            }
          }
          if ( ok ) {
            found = true;
            grid[ cc + rr * cols ] = sample;
            active.push( sample );
          } 
        }
      }
      if ( !found ) {
        active.splice( randIndex, 1 );
      }
    }

  for ( var i = 0; i < grid.length; i++ ) {
    stroke( 255 );
    strokeWeight( 4 );
    if ( grid[ i ] ) {
      point( grid[ i ].x, grid[ i ].y);
    }
  }

  for ( var i = 0; i < active.length; i++ ) {
    stroke( 255, 50, 0 );
    strokeWeight( 4 );
    point( active[ i ].x, active[ i ].y );
  }
}
