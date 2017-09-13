"use strict"

var world;
var shift_up_button;
var shift_down_button;

var data;

function preload() {
  loadJSON("phenomena_stash.json", function(json_data) {
    // console.log('json loaded:', json_data);
    data = json_data;
  });
}

function setup() {
  // frameRate(5);
  // pixelDensity(1.0);
  // createCanvas(900, 600);
  createCanvas(windowWidth, windowHeight);
  
  var particles = 40;
  var phenomena = 5;
  world = new World(particles, phenomena);
  world.initialize();

  // Button zum umschalten zwischen den Phänomenen
  shift_up_button = createButton('Shift Up');
  shift_down_button = createButton('Shift Down');
  shift_up_button.mousePressed(shiftUp);
  shift_down_button.mousePressed(shiftDown);

  var ui = createDiv('');
  var t = createElement('h1', 'Controls');
  ui.id('ui-buttons');
  ui.child(t);
  ui.child(shift_up_button);
  ui.child(shift_down_button);

  // Navigation
  var listOfPhenomena = document.createElement('ul');
  ui.child(listOfPhenomena);
  for (var i = 0; i < world.phenomena.length; i++) {
    var li = document.createElement('li');
    li.setAttribute('index', i);
    li.innerHTML = 'Phenomenon N°' + i;
    li.addEventListener('click', function(e) {
      var index = parseInt(e.target.getAttribute('index'));
      world.jumpToPhenomenon(index); 
    });
    li.addEventListener('mouseover', function(e) {
      var index = parseInt(e.target.getAttribute('index'));
      e.target.style.backgroundColor = 'hsla(' + world.phenomena[index].hue_start + ', ' + world.phenomena[index].saturation + '%, ' + world.phenomena[index].brightness_start + '%, 0.2)';
    });
    li.addEventListener('mouseout', function(e) {
      e.target.style.backgroundColor = 'transparent';
    });
    li.style.color = 'hsl(' + world.phenomena[i].hue_end + ', ' + world.phenomena[i].saturation + '%, ' + world.phenomena[i].brightness_end + '%)';
    listOfPhenomena.appendChild(li);
  }

  // erstes mal einblenden der Eigenschaften der Phaenomene
  specs();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
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
  // in draw muss für jedes frame shiftPhenomenon ausegführt werden,
  // wahrsch. ohne argument.
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
  stroke(0);
  // background(0, 100);
  background(255, 150);
  translate(width/2, height/2);

  // world.positionParticles();
  world.positionParticlesSimple();
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
