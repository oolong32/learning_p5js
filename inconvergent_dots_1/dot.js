function Dot() {
  this.x = random(0, width);
  this.y = height / 2;
  this.s = 4;
  this.red = 0;
  this.green = 120;
  this.blue = 255;
  this.memDepth = 30;
  this.memory = [];
  this.velocity = 1;
  this.maxVelocity = 10;
  
  this.update = function() {
    if (this.velocity <= this.maxVelocity && this.velocity >= -this.maxVelocity) {
      this.velocity += random(-1, 1);
    } else if (this.velocity < -this.maxVelocity) {
      this.velocity += 1;
    } else if (this.velocity > this.maxVelocity) {
      this.velocity -= 1;
    }
    this.memory.push(this.y);
    if (this.memory.length >= this.memDepth) {
      this.memory.splice(0, 1);
    }
    if (this.y >= height) {
      this.y -= random(0, this.velocity);
    } else if (this.y <= 0) {
      this.y += random(0, this.velocity);
    } else {
      this.y += random(-this.velocity, this.velocity);
    }
  }
  this.display = function() {
    fill(this.setColor());
    noStroke();
    ellipse(this.x, this.y, this.s, this.s);
    push()
    this.alpha = 50;
    var fade = 50/this.memDepth;
    line(this.x, this.y, this.x, this.y + this.velocity);
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
