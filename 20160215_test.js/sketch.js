var x = 50;
var y = 50;
var SIDE = 220;

var my_shape = {
  x_pos: x,
  y_pos: y,
  s: SIDE * 0.8,
  // arrays of coordinates
  x_list: [],
  y_list: [],
  random_x: function() {
    var new_x = parseInt(this.x_pos + Math.random() * (this.s - 0));
    return parseInt(new_x);
  },
  random_y: function() {
    var new_y = parseInt(this.y_pos + Math.random() * (this.s - 0));
    return parseInt(new_y);
  },
  coordinates: function(x, y) {
    //12 needed to generate 23 movements, as always one stays the same when moving orthogonally.
    for (i = 0; i < 12; i++) {
      this.x_list.push(this.random_x())
      this.y_list.push(this.random_y())
    }
  },
  draw_shape: function() {
    //Punkte im Figurquadrat
    this.coordinates(this.x_pos, this.y_pos);
    beginShape();
    // irgendwo beginnend
    // Falls Berührungspunkte zwischen den Figurquadraten vermieden werden sollen, muss SIDE mit 0.9 oder 0.8 multipliziert werden
    vertex(this.x_list[0], this.y_list[0]);
    for (i = 1; i < 12; i++) {
      // move vertically
      vertex(this.x_list[i - 1], this.y_list[i]);
        // move horizontally
      vertex(this.x_list[i], this.y_list[i]);
    }
    endShape(CLOSE)
  },
};

function setup() {
  createCanvas(600, 400);
  noFill();
  stroke(0);
  strokeWeight(2);
}

function draw() {
  my_shape.draw_shape();
}







