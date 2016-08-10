// Coding Challenge #17: Fractal Trees - Space
// https://youtu.be/kKT0v3qhIQY?list=PLRqwX-V7Uu6bxNsa_3SfCPyF9Md9XvXhR

var tree;
var max_dist = 500; // arbitrarily high number
var min_dist = 10;

function setup() {
  createCanvas( 400, 400 );
  background( 31 );
  tree = new Tree();
}

function draw() {
  background( 51 );
  tree.show();
  tree.grow();
}
