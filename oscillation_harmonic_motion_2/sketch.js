// D. Shiffman, Nature of Code #3.3
// https://youtu.be/GvwPwIUSYqE
// example at 16:45

var oscillators = [];

function setup() {
  createCanvas(400, 300);

  for (var i = 0; i < 10; i++) {
    oscillators.push(new Oscillator());
  }
}

function draw() {
  background(45);
  for (var i = 0; i < oscillators.length; i++) {
    oscillators[i].oscillate();
    oscillators[i].display();
  }
}

var Oscillator = function() {
  this.angle = createVector();
  this.velocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05))
  this.amplitude = createVector(random(20, width/2), random(20, height/2))

  this.oscillate = function() {
    this.angle.add(this.velocity);
  };

  this.display = function() {
    var x = sin(this.angle.x) * this.amplitude.x;
    var y = sin(this.angle.y) * this.amplitude.y;

    push();
    translate(width/2, height/2)
    stroke(0, 255, 40);
    noFill();
    ellipse(x, y, 24, 24)
    pop();
  };
};
