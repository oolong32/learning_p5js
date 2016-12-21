var dots = [];

function setup() {
  createCanvas(1000, 300);
  background(0);
  for (var i = 0; i < width; i += 1) {
    dots.push(new Dot(i));
  }
}

function draw() {
  background(0);
  var sumOfVelocities = 0;
  for (var i = 0; i < dots.length; i++) {
    if (i < 0) {
      sumOfVelocities += dots[i-1].velocity;
      console.log(sumOfVelocities);
      dots[i].setSpecialVelocity(sumOfVelocities);
    }
    dots[i].update();
    dots[i].display();
  }

}
