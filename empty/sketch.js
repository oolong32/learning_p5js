var angle = 0;

function setup() {
 createCanvas( 400, 400 );
}

function draw() {
  background( 51 );

  translate( width / 2, height / 2 );
  rotate( angle );
  strokeWeight( 4 );
  stroke( 255 );
  line( 0, 0, 100, 0 );
  angle += 0.01;

}
