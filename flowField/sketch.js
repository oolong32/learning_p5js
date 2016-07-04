var inc = 0.1;
var scl = 20;
var cols, rows;

var zoff = 0;
var particles = [];
var flowfield; // in order to check position of moving dots

// check framerate
var fr;

function setup() {
  background( 255 );
  createCanvas( 400, 400 );

  // pixelDensity( 1 ); // ignore retina display density

  cols = floor( width / scl );
  rows = floor( height / scl );
  fr = createP('');

  flowfield = new Array( cols * rows ); // assign as many positions to array as there are fields. might be unneccessary.
  for ( var i = 0; i < 200; i++ ) {
    particles[ i ] = new Particle();
  }
}

function draw() {
  // background( 255 );

  var yoff = 0;
  for ( var y = 0; y < rows; y++ ) {
    var xoff = 0;
    for ( var x = 0; x < cols; x++ ) {
      var index = ( x + y * cols ); // which field are we in right now?
      var angle = noise( xoff, yoff, zoff ) * TWO_PI;
      var v = p5.Vector.fromAngle( angle ); 
      v.setMag( .5 );
      flowfield[ index ] = v; // store vector in array
      xoff += inc;
      noFill();
      stroke( 0, 40 );
      strokeWeight( 1 );

      push();
      translate( x * scl, y * scl );
      rotate( v.heading());
      // line( 0, 0, scl, 0 );
      pop();

    }
    yoff += inc;
    zoff += 0.0003;
  }

  var pl = particles.length;
  for ( var i = 0; i < pl; i++ ) {
    particles[ i ].follow( flowfield );
    particles[ i ].update();
    particles[ i ].edges();
    particles[ i ].show();
  }

  fr.html( floor( frameRate()));
}
