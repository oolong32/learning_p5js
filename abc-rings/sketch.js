var c;
var rings = []
var things = [];

function setup() {
  var croppy = createElement('div');
  c = createCanvas(400, 400);
  c.parent(croppy);
  translate(width/2, height/2);
  noStroke();
  frameRate(12);
}

function more() {
  for (var i = 0; i < Math.PI * 2 - 0.01; i += Math.PI * 2 / 24) {
    var x = Math.cos(i);
    var y = Math.sin(i);
    var new_thing = new Thing(x, y, i);
    things.push(new_thing);
  }
  if (rings.length > 0) {
    for (var i = 0; i < rings.length; i++) {
      var ring = rings[i];
      if (ring.length > 0) {
        for (var j = 0; j < ring.length; j++) {
          var thing = ring[j];
          thing.siz += 1;
          thing.move();
        }
      }
    }
  }
  rings.push(things);
  things = [];
}

// function keyPressed() {
//   // save(c, 'x.jpg');
//   saveFrames("c", "png", 1, 25);
// }

function draw() {
  background(0);
  translate(width/2, height/2);
  more()
  if (rings.length > 0) {
    for (var i = 0; i < rings.length; i++) {
      var ring = rings[i];
      rotate(0.03);
      if (ring.length > 0) {
        for (var j = ring.length-1; j >= 0; j--) {
          var thing = ring[j];
          if (thing.out()) {
              ring.splice(j, 1);
            }
          thing.show();
        }
      }
    }
  }
}
