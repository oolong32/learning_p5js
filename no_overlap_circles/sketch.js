var circles = [];

function setup() {
	createCanvas(640, 360);
	
	// protect from infinite loop
	var protection = 0;
  
	while (circles.length < 600) {
		var circle = {
			x: random(width),
			y: random(width),
			r: random(4, 20)
		};

		var overlapping = false;
		
		for (var j = 0; j < circles.length; j+=1) {
			var other = circles[j];
			var d = dist(circle.x, circle.y, other.x, other.y);
			if (d < circle.r + other.r + 1) {
				overlapping = true;
				break; 
			}
		}

		if (!overlapping) {
			circles.push(circle);
		}

		protection += 1;
		if (protection > 500000) {
			break;
		}
	}
}

function draw() {
	for ( var i = 0; i < circles.length; i+=1) {
		fill(0, 150, 255, 100);
		noStroke();
		ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
	} 
}
