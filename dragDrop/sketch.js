var dropzone;

function setup() {
	createCanvas(300, 200);
	background(0);
	
	dropzone = select('#drop');
	dropzone.dragOver(highlight);
	dropzone.dragLeave(unHighlight);
	dropzone.drop(receiveFile, unHighlight); 
} 

function highlight() {
	dropzone.style('background', 'PaleGreen');
}

function unHighlight() {
	dropzone.style('background', 'white');
}

function receiveFile(file) {
	createP(file.name);
	createP(file.type);
	createP(file.size);
	var img = createImg(file.data);
	img.style('width', '120px');
	img.style('height', 'auto');
}
