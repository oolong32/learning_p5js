var c;

function setup() {
  c = color( 0, random( 100, 255 ), random( 140, 255 ) );
  translate( width / 2, height / 2 );
  background( 127 );
  noStroke();
  fill( c );
  ellipse( 0, 0, 20, 20);
}

function draw() {
}
