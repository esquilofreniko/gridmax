inlets = 1;
outlets = 3;

var pattern = Array(8);
var length = 8;
var lcounter = 0;
var tempoin = 200;
var qttimer = 0;
var slew = 0;
var sync = 0;
var wait = 0;
var finished = 1;
var rec = 0;

load();

function load(){
	pattern = Array(8);
	counter = 0;
	length = 8;
	for(var i=0;i<8;i++){
		pattern[i] = Array(3);
	}
	for(var i=0;i<8;i++){
		pattern[i] = [Math.floor(Math.random()*14), Math.floor(Math.random()*8), Math.floor((Math.random()*1800)+200)];
	}
}

function rand(){
	for(var i=0;i<8;i++){
		pattern[i] = [Math.floor(Math.random()*14), Math.floor(Math.random()*8), Math.floor((Math.random()*1800)+200)];
	}
}

function maintempo(v){
	tempoin = v*4;
}

function xy(x,y,z,t){
	if(z == 0){
		if(x < 14){
			if(rec == 1){
				pattern[length] = [x,y,t];
				outlet(0,pattern[counter]);
				length += 1;
				if(length > 8){
					length = 8;
				}
				counter = length;
				for(var i=0;i<8;i++){
					if(i < (8-length)){
					outlet(2, 0,i,0);
					}
					if(i>= (8-length)){
					outlet(2,0,i,1);	
					}
				}
			}
			if(rec == 0){
				pattern[counter] = [x,y,t];
				outlet(0,pattern[counter]);
				counter += 1;
				counter %= length;
			}
		}
		if(x == 15){
			if(y == 0){
				for(var i=0;i<8;i++){
					pattern[i][2] *= 2;
					if(pattern[i][2]>60000){
						pattern[i][2] = 60000;
					}
					outlet(0,pattern[counter]);
				}
			}
			if(y == 1){
				for(var i=0;i<8;i++){
					pattern[i][2] *= 0.5;
					if(pattern[i][2]<50){
						pattern[i][2] = 50;
					}
					outlet(0,pattern[counter]);
				}
			}
		}
	}
	if(x == 15){
		if(z > 0){
			if(y == 2){
				for(var i=0;i<8;i++){
					pattern[i][2] = tempoin;
					outlet(0,pattern[counter]);

				}
			}
			if(y == 3){
				reset();
			}
			if(y == 4){
				slew += 1;
				slew %= 2;
				outlet(1,slew+1);
				outlet(2,1,4,slew);
				
			}
			if(y == 5){
				rec += 1;
				rec %= 2;
				outlet(2,1,5,rec);
				if(rec == 1){
					length = 0;
					counter = 0;
					lcounter = 0;
				}
				if(rec == 0){
					counter = 0;
					lcounter = -1;
					if(length < 1){
						length = 1;
					}
					next();
				}
				for(var i=0;i<8;i++){
					if(i < (8-length)){
					outlet(2, 0,i,0);
					}
					if(i>= (8-length)){
					outlet(2,0,i,1);	
					}
				}
			}
			if(y == 6){
				rand();
			}
		}
	}
	if(x == 14){
		length = 8-y;
		if(length > 1){
			next();
		}
		for(var i=0;i<8;i++){
			if(i < (8-length)){
			outlet(2, 0,i,0);
			}
			if(i>= (8-length)){
			outlet(2,0,i,1);	
			}
		}
	}
}

function next(){
	if(rec == 0){
		lcounter += 1;
		lcounter %= length;
		outlet(0,pattern[lcounter]);
	}
}

function reset(){ 
	lcounter = 0;
	outlet(0,pattern[lcounter][0],pattern[lcounter][1],1);
}