function Thing(x, y) {
  this.pos = createVector(x, y);
  this.out = false;
  this.lit = 50;
  this.hue = int(random(255));
  var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  this.txt = abc[int(random(abc.length))];
  this.id = null;

  this.show = function() {
    // fill(this.hue, 100, this.lit);
    var c = color('hsl(' + this.hue + ', 100%, ' + this.lit + '%)');
    fill(c);
    // ellipse(this.pos.x, this.pos.y, 5, 5);
    textFont('InputMono');
    textSize(10);
    text(this.txt, this.pos.x, this.pos.y);
  };
  this.update = function() {
    if (this.out) {
      this.goHome();
    } else {
      this.pos.x += random(-1, 1);
      this.pos.y += random(-1, 1);
    }
  };
  this.check = function() {
    if (this.pos.x >= width || this.pos.x <= 0 || this.pos.y >= height || this.pos.y <= 0) {
      this.out = true;
    }
    var center = createVector(width/2, height/2);
    if (dist(this.pos.x, this.pos.y, center.x, center.y) < 1) {
      this.out = false;
    }
  };
  this.goHome = function() {
    var center = createVector(width/2, height/2);
    var dir = center.sub(this.pos);
    this.pos.add(dir.normalize());
  }
}
