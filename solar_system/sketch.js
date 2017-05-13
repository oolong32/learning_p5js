var sun;

function setup() {
  createCanvas(600, 300);
  background(0);
  sun = new Planet(40, 0, 0, 0);
  sun.spawnMoons(5);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  sun.show();
  sun.orbit();
}
