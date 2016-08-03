var angle;
var slider;

function setup() {
  createCanvas( 300, 200 );
  pixelDensity( 1 );
  slider = createSlider( 0, TWO_PI, Math.PI / 4, 0.01 );
}

function draw() {
  background( 51 );
  stroke( 0, 255, 100 );
  angle = slider.value();
  translate( 100, height);
  branch( 62 );
}

function branch( len ) {
  line( 0, 0, 0, -len );
  translate( 0, -len);
  if ( len > 1 ) {
    push();
    rotate( angle )
    branch( len * 0.67 );
    pop();
    rotate( -angle );
    branch( len * 0.67);
  }
}
