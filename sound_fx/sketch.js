var snake;
var scl = 20;
var cols;
var rows;
var food;

var eatSound;
var startOver;

function preload() {
  eatSound = loadSound("./fx/Alert/Alert-06.mp3");
  startOver = loadSound("./fx/Input/Input-03.mp3");
}

function setup() {
  createCanvas( 600, 600 );
  cols = width / scl;
  rows = height / scl;
  snake = new Snake();
  frameRate( 7 );
  pickLocation();
  food = pickLocation();
}

function draw() {
  background( 51 );
  snake.update();
  snake.show();
  if ( snake.eat( food )) {
    eatSound.play();
    food = pickLocation();
  }

  // check if snake hits itself
  snake.death();

  fill( 0, 120, 255 );
  rect( food.x, food.y, scl, scl );
}

function pickLocation () {
  newFood = createVector( floor( random( cols )), floor( random( rows )));
  newFood.mult( scl );
  return newFood;
}

function keyPressed () {
  if ( keyCode === UP_ARROW ) {
    snake.dir( 0, -1 );
  } else if ( keyCode === DOWN_ARROW ) {
    snake.dir( 0, 1 );
  } else if ( keyCode === RIGHT_ARROW ) {
   snake.dir( 1, 0 );
  } else if ( keyCode === LEFT_ARROW ) {
    snake.dir( -1, 0 );
  }
} 
