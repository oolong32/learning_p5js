// https://en.wikipedia.org/wiki/Maze_generation_algorithm

var cols, rows;
var w = 20;
var grid = [];
var stack = [];

var current; // cell being currently visited

function setup() {
	createCanvas(400, 400);
	cols = floor(width / w);
	rows = floor(height / w);

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}
	
	current = grid[0];
	// frameRate(12);
}

function draw() {
	background(51);
	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	current.visited = true;
	current.highlight();
	// Step 1: Choose randomly one of the unvisited neighbours
	var next = current.checkNeighbors();
	if (next) {
		next.visited = true;
		// Step 2: Push the current cell to the stack
		stack.push(current);
		// Step 3: Remove the wall between the current cell and the chosen cell
		removeWalls(current, next);
		// Step 4: Make the chosen cell the current cell and mark it as visited
		current = next;
	} else if (stack.length > 0) { // if there is no available neighbor, but cells in the stack
		current = stack.pop();
	}
}

function index(i, j) {
	if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
		return -1;
	}
	return i + j * cols; // see video about pixelgrid
} 

function removeWalls(a, b) {
	var x = a.i - b.i; // find out if cells are next to each other horizontally (result should be 1 (left) or -1 (right)
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	var y = a.j - b.j; // find out if the cells are next to each other on the vertical axis
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}
