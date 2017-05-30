var c;

function setup() {
  var cc = createCanvas(200, 200);     <————————————— Testen ob das besser geht
  cc.id('foo')                         <————————————— Testen ob das besser geht
  c = document.getElementById('foo');  <————————————— Testen ob das besser geht
  c.addEventListener('touchstart', function(e) { bar(e); });
  c.addEventListener('touchmove', function(e) { bar(e); });
}

function mouseMoved() {
  spawnText();
}

function bar(e) {
  if (e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    var posX = touch.clientX - 25;
    var posY = touch.clientY - 25;
  } else {
    var posX = mouseX;
    var posY = mouseY;
  }
}

function draw() {
	// …
}