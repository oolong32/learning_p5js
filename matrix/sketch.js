var symbolSize = 14;
var streams = []

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  textFont('HiraMaruPro-W4');
  textSize(symbolSize);
  
  for (var i = 0; i < width / symbolSize; i++) {
    var y = random(-1000, 0);
    var stream = new Stream(i*symbolSize, y);
    stream.generateSymbols();
    streams.push(stream);
  }
}

function draw() {
  background(0, 90);
  for (var i = 0; i < streams.length; i++) {
    streams[i].render();
  }
}

function Symbol(x, y, speed) {
  this.x = x;
  this.y = y;
  this.first;
  this.speed = speed;
  this.value = 0x30A0 + round(random(0, 96))
  this.switchInterval = round(random(2, 20));

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
    }
  };

  this.rain = function() {
    this.y = (this.y >= height) ? -symbolSize : this.y + this.speed;
  };
}

function Stream(x, y) {
  this.y = y;
  this.x = x;
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(1, 3);

  this.generateSymbols = function() {
    var y = this.y;
    var x = this.x;
    for (var i = 0; i <= this.totalSymbols; i++) {
      var symbol = new Symbol(x, y, this.speed);
      symbol.first = (i == 0) ? (round(random(0, 4)) == 1) : false;
      this.symbols.push(symbol);
      y -= symbolSize;
    }
  };

  this.render = function() {
    for (var i = 0; i < this.symbols.length; i++) {
      if (this.symbols[i].first) {
        fill(0, 255, 200);
      } else {
        fill(0, 255, 50);
      }
      text(this.symbols[i].value, this.symbols[i].x, this.symbols[i].y);
      this.symbols[i].rain();
      this.symbols[i].setToRandomSymbol();
    }
  }
}
