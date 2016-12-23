var dots = [];

function setup() {
  createCanvas(1000, 300);
  background(0);
  for (var i = 0; i < width; i += 3) {
    dots.push(new Dot(i));
  }
}

function draw() {
  // background(0);
  var sumOfVelocities_x = 0;
  var sumOfVelocities_y = 0;
  for (var i = 0; i < dots.length; i++) {
    if (i > 0) {
      sumOfVelocities_x += dots[i-1].velocity_x;
      sumOfVelocities_y += dots[i-1].velocity_y;
      dots[i].setSpecialVelocity(sumOfVelocities_x, sumOfVelocities_y);
    }
    dots[i].update();
    dots[i].display();
  }

}
