// Dan Shiffman, Coding Challenge
// https://youtu.be/BAejnwN4Ccw
// https://en.wikipedia.org/wiki/Travelling_salesman_problem
// First go at the problem, not very efficient

var travel_path = [];
var totalCities = 5;
var recordDistance;
var bestEver;

function setup() {
  createCanvas( 400, 300 );
  for ( var i = 0; i < totalCities; i++ ) {
    var v = createVector( random( width ), random( height ) )
    travel_path[ i ] = v;
  }
  var d = calc_distance( travel_path );
  recordDistance = d;
  bestEver = travel_path.slice(); // slice() stores a copy of an array
}

function draw() {
  background( 33 );
  strokeWeight( 1 );
  stroke( 255, 190, 0, 150 );
  noFill();

  beginShape();
  for ( var i = 0; i < travel_path.length; i++ ) {
    ellipse( travel_path[ i ].x, travel_path[ i ].y, 6, 6 );
    vertex( travel_path[ i ].x, travel_path[ i ].y);
  }
  endShape();

  strokeWeight( 2 );
  stroke( 0, 190, 0 );
  beginShape();
  for ( var i = 0; i < bestEver.length; i++ ) {
    ellipse( bestEver[ i ].x, bestEver[ i ].y, 6, 6 );
    vertex( bestEver[ i ].x, bestEver[ i ].y);
  }
  endShape();

  var rand_index_1 = floor( random( travel_path.length ) );
  var rand_index_2 = floor( random( travel_path.length ) );
  swap( travel_path, rand_index_1, rand_index_2 );

  var d = calc_distance( travel_path );
  if ( d < recordDistance ) {
    recordDistance = d;
    bestEver = travel_path.slice();
  }
}

function swap( arr, index_1, index_2 ) {
  var keep = arr[ index_2 ];
  arr[ index_2 ] = arr[ index_1 ];
  arr[ index_1 ] = keep;
}

function calc_distance( points ) {
  sum = 0;
  for ( var i = 0; i < points.length - 1; i++ ) {
    var d = dist( points[ i ].x, points[ i ].y, points[ i + 1 ].x, points[ i + 1 ].y )
    sum += d;
  }
  return sum;
}
