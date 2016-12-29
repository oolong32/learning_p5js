things = [];

function setup() {
  createCanvas(400, 300);
  background(0);

  var i = 0;
  for (; i < 50; i++) {
    var posx = random(0, width);
    var posy = random(0, height);
    things.push(new Thing(posx, posy));
  }

  noStroke();
}

function draw() {
  background(0);
  var i = 0;
  for (; i < things.length; i++) {
    things[i].update();

    if (i < things.length - 1) {
      var j = i + 1;
      for (;j < things.length; j++ ) {
        if (things[i].intersects(things[j])) {
          things[i].changeColor();
          things[j].changeColor();
        }
      }
    }
    things[i].display();
  }
}

function Thing(x, y) {
  this.pos = createVector(x, y);
  this.r = random(5, 20);
  this.col = color(255);

  this.intersects = function(other) {
    var sumRad = this.r + other.r;
    if (dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < sumRad) {
      return true;
    } else {
      return false;
    }
  }

  this.changeColor = function() {
    this.col = color(random(255), random(255), random(255));
  }

  this.update = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    } else {
      this.pos.x += random(-1, 1);
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    } else {
      this.pos.y += random(-1, 1);
    }
  }

  this.display = function() {
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}
