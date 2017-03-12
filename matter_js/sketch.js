var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var boundaries = [];

function setup() {
  createCanvas(400, 400);
  noStroke();

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  boundaries.push(new Boundary(270, height*0.75, 140, 20, -PI/7));
  boundaries.push(new Boundary(130, height*0.5, 140, 20, PI/7));
  boundaries.push(new Boundary(270, height*0.25, 140, 20, -PI/7));
  boundaries.push(new Boundary(130, height-20, 100, 20, PI/7));
}

function mouseDragged() {
  circles.push(new Circle(mouseX, mouseY, random(1, 4)));
}

function draw() {
  background(0);
  //
  // Engine.update(engine);
  //
  if (circles.length) {
    for (var i = circles.length - 1; i >= 0 ; i--) {
      if (circles[i].isOffScreen()) {
        circles[i].removeFromWorld();
        circles.splice(i, 1);
      } else {
        circles[i].show();
      }
    }
  }
  console.log(world.bodies.length-4, circles.length);
  if (boundaries.length) {
    for (var i = 0; i < boundaries.length; i++) {
      boundaries[i].show();
    }
  }
}
