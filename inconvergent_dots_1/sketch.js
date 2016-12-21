var dots = [];

function setup() {
  createCanvas(400, 300);
  background(0);
  for (var i = 0; i < 100; i++) {
    dots.push(new Dot());
  }
}

function draw() {
  background(0);
  for (var i = 0; i < dots.length; i++) {
    dots[i].update();
    dots[i].display();
  }

}
