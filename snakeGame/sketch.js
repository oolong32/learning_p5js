var snake;
var scl = 20;
var cols;
var rows;
var food;

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
  snake.death();
  snake.update();
  snake.show();
  if ( snake.eat( food )) {
    food = pickLocation();
  }

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
