// this is messy and not as intended …
function Dot(x) {
  this.x = x;
  this.y = height / 2;
  this.s = 3;
  this.red = 0;
  this.green = 120;
  this.blue = 255;
  this.memDepth = 30;
  this.memory = [];
  this.velocity = 0.05;
  this.specialVelocity = 0;
  this.realVelocity = this.velocity + this.specialVelocity;
  this.maxVelocity = 50;
  
  this.setSpecialVelocity = function(v) {
    this.specialVelocity = v;
  }
  this.update = function() {
    if (this.realVelocity <= this.maxVelocity && this.realVelocity >= -this.maxVelocity) {
      this.velocity += random(-this.velocity, this.velocity) + this.realVelocity;
    }
    this.memory.push(this.y);
    if (this.memory.length >= this.memDepth) {
      this.memory.splice(0, 1);
    }
    if (this.y >= height) {
      this.y = height - 1;
    } else if (this.y <= 0) {
      this.y = 1;
    } else {
      this.y += random(-this.velocity, this.velocity);
    }
  }
  this.display = function() {
    fill(this.setColor());
    noStroke();
    ellipse(this.x, this.y, this.s, this.s);
    line(this.x, this.y, this.x, this.y + this.velocity);
    push()
    this.alpha = 50;
    var fade = 50/this.memDepth;
    for (var m = this.memory.length; m >= 0 ; m -= 2) {
      this.alpha -= fade;
      noFill();
      stroke(this.setColor());
      ellipse(this.x, this.memory[m], this.s, this.s);
    }
    pop();
    this.alpha = 255;
  }
  this.setColor = function() {
    return color(this.red, this.green, this.blue, this.alpha);
  }
}
