// just wanted to find out wether line end are rounded
// and what happens, when transparent shapes overlap

function setup() {
  createCanvas( 400, 300 );
  background( 40 );

  noFill();
  stroke( 120, 240, 255, 125 );
  strokeWeight( 50 );
  line( 50, 30, 320, 230 );
  stroke( 180, 120, 240, 125 );
  line( 50, 240, 340, 80 );

}

function draw() {
}
