// height, width
var w = 520;
var h = 470;

// line height
var lh = 24;

// margins for centered position
var margin_x = (w % lh) / 2;
var margin_y = (h % lh) / 2; 

// line-length
var ll = w - margin_x * 2;
console.log("line length: " + ll);

function setup() {
  createCanvas(w, h);
	// auszeichnung zur produktion
	background(0);
	stroke(255);

	var fields = [];
	for (var i = margin_y; i < h - margin_y; i += lh) {

		// Here should be created: rectangles of differing length
		// Minimum Length = lh, max Length = ll / 2
		// we’re iterating, so fields might already contain something
		if (fields.length > 0) {
			fields.splice(0, fields.length);
		}

		// set maximum field length
		var limit = Math.floor(ll * 0.6);

		var segments = segment_line(ll, 10, limit);
		//
		//
		// Ok, wonderful. the array in funk.js (arr) is filling up and should be cleaned after every run of the segment_line function.
		// It’s just disfuncional shit. I give up. back to school and try again after learning more.
		//
		//
		for (var j = 0; j < segments.length; j += 1) {
			fields.push(segments[j]);
		} 

		// the function segment_line returned too much
		var sum_so_far = sum_arr(fields, fields.length);
		if (sum_so_far > ll) {
			var exeeding = sum_so_far - ll;
			fields[fields.length - 1] -= exeeding;
		}
		console.log("fields " + fields);
		console.log("line length: " + ll + " and sum so far: " + sum_arr(fields, fields.length));

		// draw fields
		for (var n = 0; n < fields.length; n += 1) {
			fill(random(100, 255), 0, random(180, 255));
			var x = margin_x + (sum_arr(fields, n - 1) || 0);
			rect(x, i, fields[n], lh);
		}
	}
}

function draw() {
}
