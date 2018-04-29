inlets = 1;
outlets = 2;

var pattern = Array(16);
var counter = 0;
var length = 4;

function notein(n,z){
	if(z > 0){
		pattern[counter] = ((n-1)%5);
		outlet(0, ntox(pattern[counter]), ntoy(pattern[counter]), 1);
		outlet(1,pattern[counter]);
		counter += 1;
		counter % length;
	}
}

function ntox(n){
	 x = ((n-36)%12)+2
	return x;
}

function ntoy(n){
	x = ((n-36)%12)+2;
	return y;
}