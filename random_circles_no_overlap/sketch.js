var circles = [];

function setup() {
  createCanvas(400, 300);
  background(0);

  var i = 0;
  var protection = 0;
  while (i < 400) {
    var newCircle = {
      r: random(2, 24),
      x: random(width),
      y: random(height)
    };

    if (circles.length > 1) {
      var overlap = false;
      var j = 0;
      for (; j < circles.length; j++) {
        var radii = newCircle.r + circles[j].r;
        if (dist(newCircle.x, newCircle.y, circles[j].x, circles[j].y) < radii + 1) { // +1 for a little margin
          overlap = true;
          break;
        }
      }
    }
    if (!overlap) {
      circles.push(newCircle);
    }
    i += 1;
    protection += 1;
    if (protection > 10000) {
      break;
    }
  }

  fill(0, 120, 255, 100);
  noStroke();
  for (i = 0; i < circles.length; i++) {
    ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
  }
}

function draw() {
}
