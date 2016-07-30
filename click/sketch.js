obs = [];
obsls = []; // obsolete objects, of course

function setup() {
  createCanvas( 400, 300 );
}

function mouseClicked() {
  obs.push( new Lllp( mouseX, mouseY ) );
}

function draw() {
  background( 121 );

  if ( obs.length > 0 ) { // iterate over objects in obs
    var i = obs.length - 1;
    for ( ; i >= 0; i-- ) {
      var o = obs[ i ];
      o.display();
      if ( !o.alive() ) {
        obsls.push( o );
        obs.splice( i, 1 );
      }
    }
  }

  if ( obsls.length > 0 ) { // iterate over obsolete objects
    var j = obsls.length - 1;
    for ( ; j >= 0; j-- ) {
      var b = obsls[ j ];
      push();
      fill( 255, 0, 80 );
      rect( 10, 10 * (j + 1), 4, 4 );
      pop();
    }
  }

}
