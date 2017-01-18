// D. Shiffman, Nature of Code #3.3
// https://youtu.be/GvwPwIUSYqE

var amp = 150;
var angle = 0;

function setup() {
  createCanvas(400, 300);
  fill(0, 255, 50);
  stroke(190);
}

function draw() {
  background(0);
  translate(width/2, height/2);

  x = amp * sin(angle);
  line(0, 0, x, 0);
  ellipse(x, 0, 24, 24);
  angle += 0.1;
}
