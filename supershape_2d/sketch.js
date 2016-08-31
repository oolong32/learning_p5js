// Dan Shiffman, Coding Challenge #23, 2D Supershapes
// https://youtu.be/ksRoh-10lak
// Paul Bourke: http://paulbourke.net/geometry/supershape/

var slider;
var n1 = 1;
var n2 = 1;
var n3 = 1;
var a = 1;
var b = 1;
var m = 5;

function setup() {
  createCanvas( 400, 400 );
  slider = createSlider( 0, 10, 5, 1 );
}

function supershape( theta ) {
  var m = slider.value();
  var part1 = ( 1 / a ) * cos( theta * m / 4 );
  part1 = abs( part1 );
  part1 = pow( part1, n2 );

  var part2 = ( 1 / b ) * sin( theta * m / 4 );
  part2 = abs( part2 );
  part2 = pow( part2, n3 );

  var part3 = pow( part1 + part2, 1 / n1 );
  
  if ( part3 === 0 ) {
    return 0;
  } else {
    return 1 / part3;
  }
}

function draw() {
  background( 200 );
  stroke( 0, 120, 255 );
  noFill();
  translate( width / 2, height / 2 );

  var radius = 100;
  var total_points = 500;
  var increment = TWO_PI / total_points;
  beginShape();
  for ( var angle = 0; angle < TWO_PI ; angle += increment ) {
    var r = supershape( angle );
    var x = radius * r * cos( angle );
    var y = radius * r * sin( angle );
    vertex( x, y );
  }
  endShape( CLOSE );

}
