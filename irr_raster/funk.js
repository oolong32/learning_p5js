// calculate sum of values in given array up to given index (c)
var sum_arr = function(arr, c) {
	// is there something left in the array?
	if (c === 0) {
		return 0;
	} else {
		// return last member of array plus rest
		return arr[c - 1] + sum_arr(arr, c - 1);
	}
}

var arr = [];
var new_vessel = [];
// write random numbers into array, all together should not exeed a certain limit.
var segment_line = function(remaining, max) {
	// are we still inside the allowed sum?
	if (remaining <= 0) {
		// at this point we most definitely overshot the limit
		// one of the numbers in array will need to be truncated
		// what’s more: arr is filling up with every call of this function, e.g. when it’s part of a loop to create multiple arrays.
		// so arr needs to be cleared before returning it, but that’s of course not possible, right?
		if (new_vessel.length > 0) { // is there already something in new_vessel?
			new_vessel.splice(0, new_vessel.length); // yes? out with it!
		}
		// move arr to new_vessel to hand back to sketch.js
		console.log("arr contains: " + arr);
		new_vessel = arr;
		console.log("new vessel contains: " + new_vessel)
		// empty arr
		arr.splice(0, arr.length);
		return new_vessel;
	} else {
		var new_member = get_field(0, max);
		arr.push(new_member);
		return segment_line(remaining - new_member, max);
	}
}

// Generate random number to be used as length of single field
// minimum: rasterfield
// maximum: half of line length
var get_field = function(low, high) {
	var f = Math.floor(random(low, high));
	return f;
}
