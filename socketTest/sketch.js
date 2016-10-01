var socket;
var text_entry;
var acknowledge_entry;

function setup() {
  createCanvas( 300, 400 );
  background( 0 );
  socket = io.connect( 'http://sdflkj.ch');
  text_entry = createInput();
  acknowledge_entry = createButton ( 'ok' );
  acknowledge_entry.mousePressed( sendData );
}

function sendData () {
  if ( !text_entry.value() ) {
    console.log( 'no text' );
  } else {
    var data = {
      message: text_entry.value()
    };
    console.log( 'sending', data.message );
    socket.emit( 'foo', data );
  }
}

function draw() {
}
