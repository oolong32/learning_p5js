var particles;
var phenomenon;
var wane_button;
var wax_button;

function setup() {
  // pixelDensity(1.0);
  createCanvas(500, 500);
  // frameRate(5);

  // create a couple of particles
  // by drawing on a circle

  particles = [];
  var numP = 80;
  var step = 360 / numP;
  var num = 0; // each particle gets a number
  for (var i = 0; i < 360; i += step) {
    var a = radians(i);
    var x = cos(a);
    var y = sin(a);
    var m = 220; // magnitude
    var v = createVector(x, y);
    v.mult(m);
    var p = new Partikel(num, v, 20);
    particles.push(p);
    num += 1;
  }
  // bis auf Weiteres:
  // Phaenomenon besteht aus zufälliger
  // Auswahl verfügbarer Partikel.
  phenomenon = new Phenomenon(particles, 7);
  phenomenon.initialize();
  phenomenon.findSmallGap();
  phenomenon.findBigGap();

  // Buttons (testweise)
  // bedenke: wir wollen nicht nur
  // vergrössern/-kleinern, sondern von
  // einem Phänomen zum anderen wechseln.
  wane_button = createButton('wane');
  wax_button = createButton('wax');
  wane_button.mousePressed(wanePhenomenon);
  wax_button.mousePressed(waxPhenomenon);
}

function waxPhenomenon() {
  phenomenon.wax = true;
}

function wanePhenomenon() {
  phenomenon.wane = true;
}

function draw() {
  noFill();
  stroke(255);
  background(0);
  translate(width/2, height/2);
  for (var i = 0; i < particles.length; i++) {
    particles[i].repraesentieren();
  }
  phenomenon.display("yes");
  if (phenomenon.wane === true) { // wahrsch.
    // wärs gescheiter, diese bedingung im
    // objekt unterzubringen?
    phenomenon.pullNode();
  }

  if (phenomenon.wax === true) {
    phenomenon.pushNode();
  }
  // works :-)
  // todo: das selbe für zusätzliche partikel:
  // - wie müssen die Knoten verschoben werden,
  // um mit denen des nächsten Phänomens übereinzustimmen?
  // dann: umschalten zwischen vielen Phänomenen
}
