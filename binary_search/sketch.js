var tree;

function setup() {
  createCanvas(400, 300);
  background(50);
  tree = new Tree;

  for (var i = 0; i < 10; i++) {
    tree.addValue(floor(random(0, 100)));
  }

  console.log(tree);

  tree.traverse();
}

