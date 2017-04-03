var particles;
var phenomenon;
var shrink_button;
var grow_button;

function setup() {
  // pixelDensity(1.0);
  createCanvas(500, 400);
  frameRate(5);

  // create a couple of particles
  // by drawing on a circle

  particles = [];
  var numP = 40;
  var step = 360 / numP;
  var num = 0; // each particle will get a number
  for (var i = 0; i < 360; i += step) {
    var a = radians(i);
    var x = cos(a);
    var y = sin(a);
    var m = 80; // magnitude
    var v = createVector(x, y);
    v.mult(m);
    var p = new Partikel(num, v, 13);
    particles.push(p);
    num += 1;
  }
  // bis auf Weiteres:
  // Phaenomenon besteht aus zufälliger Auswahl aus verfügbaren Partikeln.
  phenomenon = new Phenomenon(particles, 7);
  phenomenon.initialize();
  phenomenon.findSmallestGap();
  phenomenon.findBiggestGap();

  // buttons (testweise)
  // bedenke: wir wollen nicht einfach vergrössern/-kleinern,
  // sondern von einem objekt zum anderen wechseln.
  shrink_button = createButton('shrink');
  grow_button = createButton('grow');
  shrink_button.mousePressed(wane);
  grow_button.mousePressed(wax);
  

}

function wax() {
  phenomenon.grow = true;
}

function wane() {
  phenomenon.shrink = true;
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
  if (phenomenon.shrink === true) { // wahrscheinlich wärs gescheiter diese bedingung im objekt unterzubringen?
    phenomenon.reducePhenomeon();
  }
  // works :-)
  // todo: das selbe für zusätzliche partikel:
  // - wo gibt es die grösste lücke?
  // - wie müssen die punkte verschoben werden, um mit denen des nächsten partikels übereinzustimmen?
  // dann: umschalten zwischen zwei partikeln
  // dann: umschalten zwischen vielen partikeln
  // dann: bildsprache?
}
