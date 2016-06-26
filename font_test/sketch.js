function setup() {
  loadFont( "manicotti/Manicotti-Regular.otf", loaded );
  createCanvas( 600, 400 );
}

function loaded ( manicotti ) {
  fill( 0 );
  textFont( manicotti, 72 );
  text( "ABC", 10, 80 );
}

function draw() {

}
