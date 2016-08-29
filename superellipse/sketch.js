/*
Dan Shiffman, Coding Challenge, Superellipse
https://www.youtube.com/watch?v=z86cx2A4_3E
http://paulbourke.net/geometry/supershape/
*/

var slider;

function setup() {
  createCanvas( 400, 400 );
  slider = createSlider( 0, 10, 2, 0.1 );
}

function draw() {
  background( 200 );
  translate( width / 2, height / 2 );

  var a = 100;
  var b = 100;
  var n = slider.value();

  stroke( 0, 120, 255 );
  noFill();

  beginShape();

  for ( var angle = 0; angle < TWO_PI ; angle += 0.1 ) {
    var na = 2 / n;
    var x = pow( abs( cos( angle ) ), na ) * a * sgn( cos( angle ) );
    var y = pow( abs( sin( angle ) ), na ) * b * sgn( sin( angle ) );
    vertex( x, y );
  }
  endShape( CLOSE );

}

function sgn( val ) {
  if ( val > 0 ) {
    return 1;
  } else if ( val < 0 ) {
    return -1;
  } else {
    return 0;
  }
}
