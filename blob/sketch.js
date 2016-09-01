// Outtake of Dan Shiffman, Coding Challenge September 1st, 2016

var blob;

function setup() {
  createCanvas( 400, 300 );
  blob = new Blob( width / 2, height / 2 );
  noStroke();
  fill( 255 );
}

function draw() {
  background( 0 );
  blob.display();
}
