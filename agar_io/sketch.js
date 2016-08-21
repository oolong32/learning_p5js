// Dan Shiffman, Coding Challenge #32: Agar.io

var blob;
var blobs = [];
var zoom;

function setup() {
  createCanvas( 600, 600 );
  blob = new Blob( 64, 0, 0 );
  for ( var i = 0; i < 200; i++ ) {
    var x = random( -width, width );
    var y = random( -height, height );
    blobs[ i ] = new Blob( 16, x, y ); 
  }
}

function draw() {
  background( 0 );
  translate( width / 2, height / 2 );
  var newzoom = 64 / blob.r;
  zoom = lerp( zoom, newzoom, 0.1 );
  scale( zoom );
  translate( -blob.pos.x, -blob.pos.y );

  blob.show();
  blob.update();

  var bl = blobs.length;
  for ( var i = bl - 1; i >= 0; i-- ) {
    blobs[ i ].show();
    if ( blob.eats( blobs[ i ] ) ) {
      blobs.splice( i, 1 );
    }
  }
}
