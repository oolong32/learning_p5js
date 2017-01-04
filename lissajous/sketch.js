var curvy;
var foo = "hello";

function setup() {
  createCanvas(400, 300);
  background(0);
  stroke(255);
  curvy = createVector();
}

function draw() {
  translate(width/2, height/2);

  // for (var i = 0; i < 360; i++) {
  //   var rad_i = i * (Math.PI/180);
  //   curvy.x = Math.cos(rad_i);
  //   curvy.y = Math.sin(rad_i);
  //   curvy.mult(50);
  //   ellipse(curvy.x, curvy.y, 5, 5);
  // }

  for (var i = 0; i < 2000; i++) {
    
    var rad_a = i * (Math.PI/180);
    var rad_b = i * (Math.PI/240);
    curvy.x = Math.cos(rad_a);
    curvy.y = Math.sin(rad_b);
    curvy.mult(50);
    ellipse(curvy.x, curvy.y, 5, 5);
  }
}
