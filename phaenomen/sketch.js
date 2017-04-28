var world;
var wane_button;
var wax_button;

function setup() {
  // pixelDensity(1.0);
  createCanvas(500, 500);
  // frameRate(5);
  
  var particles = 70;
  var phenomena = 3;
  world = new World(particles, phenomena);
  world.initialize();

  // Buttons (testweise) bedenke: wir wollen nicht nur
  // vergrössern/-kleinern, sondern zwischen Phänomen wechseln.
  wane_button = createButton('wane');
  wax_button = createButton('wax');
  wane_button.mousePressed(wanePhenomenon);
  wax_button.mousePressed(waxPhenomenon);
}

function waxPhenomenon() { world.active_phenomenon.wax = true; }

function wanePhenomenon() { world.active_phenomenon.wane = true; }

function draw() {
  noFill();
  stroke(255);
  background(0);
  translate(width/2, height/2);

  world.positionParticles();
  world.displayParticles();
  world.displayPhenomena();

  if (world.active_phenomenon.wane === true) { // wahrsch.
    // wärs gescheiter, diese bedingung im
    // objekt world oder phenomenon unterzubringen?
    world.active_phenomenon.pullNode();
  }

  if (world.active_phenomenon.wax === true) { // dito.
    world.active_phenomenon.pushNode();
  }
  // - wie müssen die Knoten verschoben werden,
  // um mit denen des nächsten Phänomens übereinzustimmen?
  // knoten[0] überlagern, indem alles gedreht wird. dann jeden weiteren schieben.
  // dann: umschalten zwischen vielen Phänomenen
}
