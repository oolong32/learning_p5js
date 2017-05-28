var things = [];

function setup() {
  createCanvas(200, 200);
  colorMode(HSB);
  noStroke();
}

function mouseDragged() {
  var x = mouseX;
  var y = mouseY;
  var new_thing = new Thing(x, y);
  var id = spawnText(new_thing.txt);
  new_thing.id = id;
  setStyle(id, 'color', 'hsl(' + new_thing.hue + ', 100%, ' + new_thing.lit + '%)');
  things.push(new_thing);

}

function spawnText(txt) {
  var el = document.createElement('p');
  var id = Math.random().toString(36).substring(7); // https://stackoverflow.com/a/8084248
  el.setAttribute('id', id);
  el.innerHTML = txt;
  document.body.appendChild(el);
  return id;
}

function setStyle(id, property, value) {
  var el = document.getElementById(id);
  el.style.color = value;
}

function deleteText(id) {
  var el = document.getElementById(id);
  el.parentNode.removeChild(el);
}

function draw() {
  background(0);
  if (things.length > 0) {
    for (var i = things.length-1; i >= 0; i--) {
      things[i].check();
      things[i].update();
      things[i].show();
    }
  }

  if (things.length > 20) { // prevent overpopulation
    var d = things.length - 20;
    for (var i = 0; i < d; i++) {
      if (things[i].lit <= 0) {
        deleteText(things[i].id);
        things.splice(i, 1);
      } else {
        fade(i);
        setStyle(things[i].id, 'color', 'hsl(' + things[i].hue + ', 100%, ' + things[i].lit + '%)');
      }
    }
  }
}

function fade(i) {
  if (things[i]) {
    things[i].lit -= 0.5;
  }
}
