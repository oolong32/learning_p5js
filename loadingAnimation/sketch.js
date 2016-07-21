var songs = [];
var loading = true;
var counter = 0;

var angle = 0;

function loadMySounds( index, filename ) {
  loadSound( filename, soundLoaded );
  function soundLoaded( sound ) {
    console.log( index, filename );
    songs[ index ] = sound;
    counter += 1;
    if ( counter == 2 ) {
      loading = false;
    }
  }
}

function setup() {
 createCanvas( 400, 400 );

 loadMySounds( 0, 'sound/hundener.mp3' );
 loadMySounds( 1, 'sound/rädigigel.mp3' );
}

function draw() {
  background( 51 );

  if ( loading ) {
    translate( width / 2, height / 2 );
    rotate( angle );
    strokeWeight( 4 );
    stroke( 255 );
    line( 0, 0, 100, 0 );
    angle += 0.1;
  } else {
    background( 100, 110, 180 );
  }
}
