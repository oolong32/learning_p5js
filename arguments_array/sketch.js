// Arguments Array in JavaScript
// https://youtu.be/4Sw6OUXjHsk

var particles = [];

function setup() {
  createCanvas( 400, 300 );
  particles[ 0 ] = new Particle();
  particles[ 1 ] = new Particle( 100, 100 );
  var v = createVector( 200, 150 );
  particles[ 2 ] = new Particle( v );
  particles[ 3 ] = new Particle( "150, 200" );

}

function draw() {
  background( 0 );
  for ( var i = 0; i < particles.length; i++ ) {
    particles[ i ].show();
  }
}

function Particle( a, b ) {
  if ( a instanceof p5.Vector ) {
    this.x = a.x;
    this.y = a.y;
  } else if ( typeof( a ) === "string" ) { // caution: instanceof returns true only for full fledged string objects
    var nums = a.split( ',' ); // create array of strings
    this.x = Number( nums[ 0 ] ); // convert strings to numbers
    this.y = Number( nums[ 1 ] ); // convert strings to numbers

  } else {
    this.x = a || 50;
    this.y = b || 50;
  }

  this.show = function() {
    fill( 255 );
    ellipse( this.x, this.y, 16, 16 );
  }
}
