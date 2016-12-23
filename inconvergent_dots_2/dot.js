// dots in a line, each has it’s own varying velocity.
// each dot additionally gets a ‘special velocity’, the sum of the dots to its left.
// following this article by @inconvergent: http://inconvergent.net/shepherding-random-numbers/
function Dot(x) {
  this.x = x;
  this.y = height / 2;
  this.s = 3;
  this.red = 0;
  this.green = 120;
  this.blue = 255;
  this.memDepth = 30;
  this.memory = [];
  this.velocity = random(1, -1); // start either positive or negative
  this.specialVelocity = 0;
  this.totalVelocity = 0;
  this.alpha = 20;
  
  this.setSpecialVelocity = function(v) {
    this.specialVelocity = v;
  }

  this.update = function() {
    // push old position to memory
    this.memory.push(this.y);
    if (this.memory.length >= this.memDepth) {
      this.memory.splice(0, 1);
    }

    // prevent dot from moving out of the canvas
    if (this.y >= height) {
      this.y = height - 1;
    } else if (this.y <= 0) {
      this.y = 1;
    } else { // move according to velocity
      this.velocity = random(-1, 1);
      this.totalVelocity = this.velocity + this.specialVelocity;
      this.y += this.totalVelocity;
    }
  }

  this.display = function() {
    fill(this.setColor());
    stroke(this.setColor());
    ellipse(this.x, this.y, this.s, this.s);

    // display line to show velocity
    line(this.x, this.y, this.x, this.y + this.totalVelocity * 2);

    // display positions in memory
    /*
    push()
    this.alpha = 50;
    var fade = 50/this.memDepth;
    for (var m = this.memory.length; m >= 0 ; m -= 2) {
      this.alpha -= fade;
      stroke(this.setColor());
      noFill();
      ellipse(this.x, this.memory[m], this.s, this.s);
    }
    pop();
    this.alpha = 255;
    */
  }

  this.setColor = function() {
    return color(this.red, this.green, this.blue, this.alpha);
  }
}
