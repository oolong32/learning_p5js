// https://youtu.be/OIfEHD3KqCg
// p5.js sketch as background for a webpage

var canvas;

function setup() {
  canvas = createCanvas( windowWidth, windowHeight );
  canvas.position( 0, 0 );
  canvas.style( 'z-index', '-1' )
}

function draw() {
  background( 0, 255, 20 );
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
