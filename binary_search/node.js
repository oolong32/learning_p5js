function Node(val, x, y) {
  this.value = val;
  this.left = null;
  this.right = null;
  // x, y are needed to visualize the binary tree
  this.x = x;
  this.y = y;
}

Node.prototype.visit = function(parent) { // parent needed to draw line to parent node
  if (this.left != null) {
    this.left.visit(this);
  }
  console.log(this.value);
  stroke(0, 255, 75);
  noFill();
  ellipse(this.x, this.y, 50, 50);
  line(parent.x, parent.y, this.x, this.y);
  push();
  noStroke();
  fill(255, 70, 0);
  textAlign(CENTER);
  text(this.value, this.x, this.y);
  pop();
  if (this.right != null) {
    this.right.visit(this);
  }
}

Node.prototype.search = function(val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
    return this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
}

Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
      this.left.x = this.x - 50;
      this.left.y = this.y + 10;
    } else {
      this.left.addNode(n);
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
      this.right.x = this.x + 60;
      this.right.y = this.y + 20;
    } else {
      this.right.addNode(n);
    }
  } else {
    // same value
  }
};
