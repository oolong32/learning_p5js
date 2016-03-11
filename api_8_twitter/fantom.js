var page = require('webpage').create();
page.open('../shape_raster/index.html', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('example.png');
		console.log('example.png written');
  }
  phantom.exit();
});

/*
console.log('foo bar');
phantom.exit();
*/
