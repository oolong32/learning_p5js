// draw vertices along a circle
// by moving around the circle in fractions of PI we get symmetrical polygons
// nice ‘trouvaille’ when experimenting based on of Dan Shiffman’s Superellipsis Coding Challenge

function setup() {
  createCanvas( 400, 400 );
  background( 200 );
}

function draw() {
  stroke( 0, 120, 255 );
  strokeWeight( 3 );
  noFill();
  translate( width / 2, height / 2 );
  beginShape();
  for ( var i = 0; i < 2 * PI ; i += PI / 5 ) {
    var x = cos( i );
    var y = sin( i );
    var pos = createVector( x, y );
    var scale = 40;
    pos = pos.mult( scale );
    vertex( pos.x, pos.y );
  }
  endShape( CLOSE );
  noLoop();
}
