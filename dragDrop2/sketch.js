function setup() {
	var canvas = createCanvas(300, 200);
	background(0);
	
	canvas.drop(receiveFile); 
} 

function receiveFile(file) {
	createP(file.name);
	var img = createImg(file.data);
	img.remove();
	image(img, 0, 0, width, height);
}
