// Dan Shiffman Coding Challenge #34: Diffusion-Limited Aggregation
// https://youtu.be/Cl_Gjj80gPE

var tree = []; // finished thing
var walkers = []; // things that move around
var maxWalkers = 300;
var iterations = 300;
var r = 4; // size

function setup() {
  createCanvas( 400, 400 );

  for ( var x = 0; x < width; x += r * 2 ) {
    tree.push( new Walker( x, height ) );
  }

  // tree[ 0 ] = new Walker( width / 2, height / 2, true );

  for ( var i = 0; i < maxWalkers; i++ ) {
    walkers[ i ] = new Walker();
  }
}

function draw() {
  background( 0 );

  var tl = tree.length;
  for ( var i = 0; i < tl; i++ ) {
    tree[ i ].show();
  }

  for ( var n = 0; n < iterations; n++ ) { // move 200 times per frame to speed up the getting-stuck-process
    var wl = walkers.length;
    for ( var i = wl - 1; i >= 0; i-- ) {
      walkers[ i ].walk();
      if ( walkers[ i ].checkStuck( tree ) ) {
        tree.push( walkers[ i ]);
        walkers.splice( i, 1 );

      }
    }
  }

  var wl = walkers.length;
  for ( var i = wl - 1; i >= 0; i-- ) {
    walkers[ i ].show();
  }

  // while ( walkers.length < maxWalkers ) {
  //   walkers.push( new Walker() );
  // }

  }
