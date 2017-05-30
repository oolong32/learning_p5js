function Thing(x, y, a) {
  this.pos = createVector(x, y);
  this.ang = a;
  this.mag = 0;
  this.lit = 10;
  this.hue = int(random(255));
  var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  this.txt = abc[int(random(abc.length))];
  this.siz = 2;

  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y);
    var angle = Math.atan2(width/2 - this.pos.x, height/2 - this.pos.y);
    rotate(this.ang + Math.PI/2);
    var c = color('hsl(' + this.hue + ', 100%, ' + this.lit + '%)');
    fill(c);
    textFont('InputMono');
    textSize(this.siz);
    text(this.txt, 0, 0);
    pop();
  };
  this.move = function() {
    this.mag += this.siz;
    this.pos.setMag(this.mag);
    this.lit += 2;
  };
  this.out = function() {
    if (this.pos.x >= width/2 - 10
     || this.pos.x <= -width/2 + 10
     || this.pos.y >= height/2 - 10
     || this.pos.y <= -height/2 + 10) {
      return true;
    } else {
      return false;
    }
  };
  this.fade = function () {
    this.lit -= 2;
  };
}
