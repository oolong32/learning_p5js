// Dan Shiffman, Coding Challenge #55
// https://youtu.be/f5QBExMNB1I
// https://en.wikipedia.org/wiki/Rose_%28mathematics%29
function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  for (var a = 0; a < TWO_PI; a += 0.01) {
    var r = 200 * cos(7 * a);
    var x = r * cos(a);
    var y = r * sin(a);
    stroke(0, 255, 0);
    strokeWeight(2);
    point(x, y);
  }
}
