var r = 100;
var a = 0;
var x, y;
var aVel = 0;
var aAcc = 0;

function setup() {
  createCanvas(640, 400);
  fill(255, 40, 0);
  stroke(255);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  x = sin(a) * r;
  y = cos(a) * r;
  line(0, 0, x, y);
  ellipse(x, y, 10, 10);

  a += aVel;
  aVel += aAcc;
  r += random(-1, 1);

  aAcc += random(-1, 1)/10;
  aVel = constrain(aVel, 0, 0.1);
}
