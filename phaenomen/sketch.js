"use strict"
var world;
var wane_button;
var wax_button;
var rotCW_button;
var rotCCW_button;
var foo;
var bar;

function setup() {
  // pixelDensity(1.0);
  createCanvas(500, 400);
  // frameRate(5);
  
  var particles = 40;
  var phenomena = 5;
  world = new World(particles, phenomena);
  world.initialize();

  // Buttons (testweise) bedenke: wir wollen nicht nur
  // vergrössern/-kleinern, sondern zwischen Phänomen wechseln.
  wane_button = createButton('Wane');
  wax_button = createButton('Wax');
  wane_button.mousePressed(wanePhenomenon);
  wax_button.mousePressed(waxPhenomenon);

  // Buttons zum Testen Rotation
  rotCW_button = createButton('Rotate Clockwise');
  rotCCW_button = createButton('Rotate Counterclockwise');
  rotCW_button.mousePressed(rotCW);
  rotCCW_button.mousePressed(rotCCW);

  // Button zum umschalten zwischen den Phänomenen
  foo = createButton('Shift Up');
  bar = createButton('Shift Down');
  foo.mousePressed(shiftUp);
  bar.mousePressed(shiftDown);

  var ui = createDiv('');
  ui.id('ui-buttons');
  ui.child(wane_button);
  ui.child(wax_button);
  ui.child(rotCW_button);
  ui.child(rotCCW_button);
  ui.child(foo);
  ui.child(bar);

  // erstes mal einblenden der Eigenschaften der Phaenomene
  specs();
}

function waxPhenomenon() {
  world.active_phenomenon.wax = true;
}

function wanePhenomenon() {
  world.active_phenomenon.wane = true;
}

function rotCW() {
  world.active_phenomenon.rotateCW();
}

function rotCCW() {
  world.active_phenomenon.rotateCCW();
}

function shiftUp() {
  // hier sollte gefragt werden, ob der shift schon ausgelöst wurde.
  // eine entsprechende Variable muss in world.js angelegt werden.
  // in draw muss für jedes frame shiftPhenomenon ausegführt werden, wahrsch. ohne argument
  // world.shiftToPhenomenon(1);
  world.initializeTransformation(1);
};

function shiftDown() {
  world.initializeTransformation(-1);
  // world.shiftToPhenomenon(-1);
};

function checkPhenomenon() {
  // checks if the curren nodes of the active phenomenon are present
  // there are cases, where part of the array is not written in time
  // to draw the particles.
  var nodes = world.active_phenomenon.current_hosts;
  var ok = true;
  for (var i = 0; i >= 0; i--) {
    var node = nodes[i];
    if (!node) {
      ok = false;
      break;
    }
  }
  return true;
}

function draw() {
  noFill();
  stroke(255);
  background(0);
  translate(width/2, height/2);

  if (checkPhenomenon()) {

    world.positionParticles();
    world.displayParticles();
    world.displayPhenomena();
    world.transformPhenomenon();

    if (world.active_phenomenon.wane === true) { // wahrsch.
      // wärs gescheiter, diese bedingung im
      // objekt world oder phenomenon unterzubringen?
      world.active_phenomenon.pullNode();
    }

    if (world.active_phenomenon.wax === true) { // dito.
      world.active_phenomenon.pushNode();
    }
  }
}
