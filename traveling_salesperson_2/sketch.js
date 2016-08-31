// Dan Shiffman, Coding Challenge #35.3: Traveling Salesperson with Lexicographic Order
// https://youtu.be/9Xy-LMAfglE

var waypoints = [];
var total_waypoints = 5;
var order_of_waypoints = [];
var record_distance;
var best_ever;
var total_permutations;
var passes;

function setup() {
  createCanvas( 250, 260 );
  for ( var i = 0; i < total_waypoints; i++ ) {
    var v = createVector( random( width ), random( height ) )
    waypoints[ i ] = v;
    order_of_waypoints[ i ] = i;
  }
  var d = calc_distance( waypoints, order_of_waypoints );
  record_distance = d;
  best_ever = order_of_waypoints.slice(); // slice() stores a copy of an array
  total_permutations = factorial( total_waypoints );
  console.log( total_permutations );
  passes = 0;
}

function draw() {
  background( 33 );
  noFill();

  strokeWeight( 1 );
  stroke( 255, 190, 0, 150 );
  beginShape(); // draw all waypoints
  for ( var i = 0; i < waypoints.length; i++ ) {
    ellipse( waypoints[ i ].x, waypoints[ i ].y, 10, 10 );
  }
  endShape();

  stroke( 120, 80, 0 );
  beginShape(); // draw all possible paths
  for ( var i = 0; i < order_of_waypoints.length; i++ ) {
    var current_waypoint = order_of_waypoints[ i ];
    vertex( waypoints[ current_waypoint ].x, waypoints[ current_waypoint ].y);
  }
  endShape();

  strokeWeight( 4 );
  stroke( 0, 190, 200, 180 );
  beginShape(); // draw best path found so far
  for ( var i = 0; i < order_of_waypoints.length; i++ ) {
    var current_waypoint = best_ever[ i ];
    vertex( waypoints[ current_waypoint ].x, waypoints[ current_waypoint ].y);
  }
  endShape();

  var d = calc_distance( waypoints, order_of_waypoints );
  if ( d < record_distance ) {
    record_distance = d;
    best_ever = order_of_waypoints.slice();
  }

  push()
  noStroke();
  fill( 150, 0, 255 );
  textSize( 14 );
  passes += 1;
  var percent = 100 * ( passes / total_permutations );
  text( nf( percent, 0, 2 ) + "% completed", 10, height - 10 );

  nextOrder();
}

function calc_distance( points, order ) {
  sum = 0;
  for ( var i = 0; i < order.length - 1; i++ ) {
    var point_a_index = order[ i ];
    var point_a = points[ point_a_index ];
    var point_b_index = order[ i + 1 ];
    var point_b = points[ point_b_index ];
    var d = dist( point_a.x, point_a.y, point_b.x, point_b.y )
    sum += d;
  }
  return sum;
}

function swap( arr, index_1, index_2 ) {
  var keep = arr[ index_2 ];
  arr[ index_2 ] = arr[ index_1 ];
  arr[ index_1 ] = keep;
}

function nextOrder() { // lexical order algorithm
  // Step 1
  var largestI = -1;
  for ( var i = 0; i < order_of_waypoints.length - 1; i++ ) {
    if ( order_of_waypoints[ i ] < order_of_waypoints[ i + 1 ] ) {
      largestI = i;
    }
  }
  if ( largestI == -1 ) {
    noLoop();
    console.log( 'finished' );
  }

  // Step 2
  var largestJ = -1;
  for ( var j = 0; j < order_of_waypoints.length; j++ ) {
    if ( order_of_waypoints[ largestI ] < order_of_waypoints[ j ] ) {
      largestJ = j;
    }
  }

  // Step 3
  swap( order_of_waypoints, largestI, largestJ );

  // Step 4: reverse from largestI + 1 to the end
  var endArray = order_of_waypoints.splice( largestI + 1 );
  endArray.reverse();
  order_of_waypoints = order_of_waypoints.concat( endArray );
}

function factorial( n ) {
  if ( n == 1 ) {
    return 1;
  } else {
    return n * factorial( n - 1 );
  }
}
