var tree = [];
var leaves = [];
var count = 0;

function setup() {
  createCanvas( 400, 300 );
  pixelDensity( 1 );

  // slider = createSlider( 0, TWO_PI, Math.PI / 4, 0.01 );

  var a = createVector( width / 2, height );
  var b = createVector( width / 2, height - 100 );
  var root = new Branch( a, b );

  tree[ 0 ] = root;
}

function mousePressed() {
  for ( var i = tree.length - 1; i >= 0; i-- ) {
    if ( !tree[ i ].grown ) {
      tree.push( tree[ i ].branchA() );
      tree.push( tree[ i ].branchB() );
    }
    tree[ i ].grown = true;
  }
  count += 1;

  if ( count === 6 ) {
    for ( var j = 0; j < tree.length; j++ ) {
      if ( !tree[ j ].grown ) {
        var leaf = tree[ j ].end.copy();
        leaves.push( leaf );
      }
    }
  }
}

function draw() {
  background( 51 );
  // angle = slider.value();
  for ( var i = 0; i < tree.length; i++ ) {
    // tree[ i ].jitter();
    tree[ i ].show(); 
  }
  for ( var i = 0; i < leaves.length; i++ ) {
    fill( 0, 255, 255, 177 );
    noStroke();
    ellipse( leaves[ i ].x, leaves[ i ].y, 8, 8 );
  }
}
