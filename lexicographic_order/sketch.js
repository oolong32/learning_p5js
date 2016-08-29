// Dan Shiffman, Coding Challenge #35.2: Lexicographic Order
// https://youtu.be/goUlyp4rwiU
// Find and sort all Possible arrangements in a sequence like ABC:
// ABC, ACB, BAC, BCA, CAB, CBA
// Applied to the traveling salesperson problem it will be used to find all possible ways of ordering the steps of the travel

var vals = [ 0, 1, 2, 3 ];

function setup() {
  createCanvas( 400, 300 );
}

function draw() {
  background( 0 );
  console.log( vals );

  // Step 1
  var largestI = -1;
  for ( var i = 0; i < vals.length - 1; i++ ) {
    if ( vals[ i ] < vals[ i + 1 ] ) {
      largestI = i;
    }
  }
  if ( largestI == -1 ) {
    noLoop();
    console.log( 'finished' );
  }

  // Step 2
  var largestJ = -1;
  for ( var j = 0; j < vals.length; j++ ) {
    if ( vals[ largestI ] < vals[ j ] ) {
      largestJ = j;
    }
  }

  // Step 3
  swap( vals, largestI, largestJ );

  // Step 4: reverse from largestI + 1 to the end
  var endArray = vals.splice( largestI + 1 );
  endArray.reverse();
  vals = vals.concat( endArray );
}

function swap( arr, index_1, index_2 ) {
  var keep = arr[ index_2 ];
  arr[ index_2 ] = arr[ index_1 ];
  arr[ index_1 ] = keep;
}
