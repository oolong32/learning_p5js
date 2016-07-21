var angle = 0;

function setup() {
 createCanvas( 400, 400 );
}

function draw() {
  background( 51 );

  translate(width/2, height/2);
  strokeWeight( 4 );
  noFill();
  stroke( 255 );
  rotate(angle);
  rect(-26, -26, 52, 52);
  angle += 0.1;
}
