var x = 0;
var timer1;
var timer2;

function makeTimer( timer, interval ) {
  var counter = 0;
  setInterval( timeIt, interval )

  function timeIt() {
    timer.html( counter );
    counter += 1;
  }
}

function setup() {
  createCanvas( 400, 300 );
  timer1 = createP( 'timer 1' );
  timer2 = createP( 'timer 2' );

  makeTimer( timer1, 400 );
  makeTimer( timer2, 300 );
}

function draw() {
  background( 51 );
  if ( x <= width ) {
    x += 1; 
  } else {
    x = 0;
  }
  strokeWeight( 1 );
  stroke( 255 );
  line( x, 0, x,  height );
}
