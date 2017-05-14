"use strict"
var world;
// var wane_button;
// var wax_button;
// var rotCW_button;
// var rotCCW_button;
var shift_up_button;
var shift_down_button;
var noise_slider;
var noise_slider_label;
var segment_slider;
var segment_slider_label;
var ring_slider;
var ring_slider_label;
var ring_distance_slider;
var ring_distance_slider_label;

function setup() {
  // pixelDensity(1.0);
  createCanvas(600, 600);
  // frameRate(5);
  
  var particles = 40;
  var phenomena = 3;
  world = new World(particles, phenomena);
  world.initialize();

  // Buttons (testweise) bedenke: wir wollen nicht nur
  // vergrössern/-kleinern, sondern zwischen Phänomen wechseln.
  // wane_button = createButton('Wane');
  // wax_button = createButton('Wax');
  // wane_button.mousePressed(wanePhenomenon);
  // wax_button.mousePressed(waxPhenomenon);

  // Buttons zum Testen Rotation
  // rotCW_button = createButton('Rotate Clockwise');
  // rotCCW_button = createButton('Rotate Counterclockwise');
  // rotCW_button.mousePressed(rotCW);
  // rotCCW_button.mousePressed(rotCCW);

  // Button zum umschalten zwischen den Phänomenen
  shift_up_button = createButton('Shift Up');
  shift_down_button = createButton('Shift Down');
  shift_up_button.mousePressed(shiftUp);
  shift_down_button.mousePressed(shiftDown);

  // Slider Varianz Noise
  noise_slider = createSlider(0, 120, 0);
  noise_slider.id('noise-slider');
  noise_slider_label = createElement('label', 'Amount of noise');
  noise_slider_label.attribute('for', 'noise-slider');
  noise_slider.changed(function() {
    var val = noise_slider.value();
    console.log(val);
    world.setNoiseRange(val);
  });

  // Slider Anzahl Segmente der Fühler
  segment_slider = createSlider(0, 40, 20);
  segment_slider.id('segment-slider');
  segment_slider_label = createElement('label', 'Number of feeler segments');
  segment_slider_label.attribute('for', 'segment-slider');
  segment_slider.changed(function() {
    var val = segment_slider.value();
    console.log(val);
    var f = world.active_phenomenon.feelers;
    if (f.length > 0); {
      for (var i = 0; i < f.length; i++) {
        f[i].number_of_segments = val; 
      }
    }
  });

  // Slider Anzahl Partikel-Ringe
  ring_slider = createSlider(0, 12, 4);
  ring_slider.id('ring-slider');
  ring_slider_label = createElement('label', 'Number of particle rings');
  ring_slider_label.attribute('for', 'ring-slider');
  ring_slider.changed(function() {
    var val = ring_slider.value();
    for (var i = 0; i < world.particles.length; i++) {
      var p = world.particles[i];
      p.rings = val;
    } 
  });

  // Slider Distanz Partikel-Ringe
  ring_distance_slider = createSlider(0.75, 1.25, 1.025, 0.025);
  ring_distance_slider.id('ring-slider');
  ring_distance_slider_label = createElement('label', 'Distance between particle rings');
  ring_distance_slider_label.attribute('for', 'ring-slider');
  ring_distance_slider.changed(function() {
    var val = ring_distance_slider.value();
    console.log(val);
    for (var i = 0; i < world.particles.length; i++) {
      var p = world.particles[i];
      p.ring_distance = val;
    } 
  });

  var ui = createDiv('');
  ui.id('ui-buttons');
  // ui.child(wane_button);
  // ui.child(wax_button);
  // ui.child(rotCW_button);
  // ui.child(rotCCW_button);
  ui.child(shift_up_button);
  ui.child(shift_down_button);
  ui.child(noise_slider_label);
  ui.child(noise_slider);
  ui.child(segment_slider_label);
  ui.child(segment_slider);
  ui.child(ring_slider_label);
  ui.child(ring_slider);
  ui.child(ring_distance_slider_label);
  ui.child(ring_distance_slider);

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
  background(0, 100);
  translate(width/2, height/2);

  // if (checkPhenomenon()) {

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
  // }
}
