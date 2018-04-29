inlets = 1;
outlets = 1;

var gm1 = Array(64);
var gm2 = Array(64);
load();

function load(){
	gm1 = Array(64);
	gm2 = Array(64);
	for(var i=0;i<64;i++){
	gm1[i] = Array(3);
	gm2[i] = Array(3);
	}
}


function list()
{
	var a = arrayfromargs(arguments);
	myval = a;
	for(var i=0;i<64;i++){
		gm1[i] = [i%8,Math.floor(i/8),a[i]];
		gm2[i] = [(i%8)+8,Math.floor(i/8),a[i+64]];
		outlet(0, gm1[i]);
		outlet(0, gm2[i]);
	}
}
