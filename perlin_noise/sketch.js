var x;
var t = 0;

function setup() {
  createCanvas(400,300);
}

function draw() {
  background(255);
  x = noise(t);
  x = map(x, 0, 1, 0, width)
  ellipse(x, width / 2, 10, 10);
  t += 0.001;
}
