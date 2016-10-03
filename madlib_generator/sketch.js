var data;

function setup() {
  noCanvas();
  Tabletop.init( { key: '1pW3pRp4eZqr5t8Iiq328xGzRvVIXV7J6D_9B-yUIoSg',
  callback: gotData,
  simpleSheet: true } );
}

function gotData( stuff, tabletop ) {
  data = stuff;
}
