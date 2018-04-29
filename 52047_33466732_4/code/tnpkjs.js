inlets = 1;
outlets = 2;

var pattern = Array(16);
var counter = 0;
var length = 16;
var rec = 0;
var play = 0;
var pos = 0;
var zprob = 0;
var div = 1;
var divcount = 0;
var transpose = 0;
load();

function load(){
	rec = 0;
	pattern = Array(16);
	for(var i=0;i<16;i++){
		pattern[i] = [-1,15,7,5];
	}
	pos = 0;
	counter = 0;
	length = 16;
	zprob = 0;
}

function write(n,x,y,z){
	if(z > 0){
		if(rec == 1){
			pattern[counter] = [n,x,y,z*5];
			redraw(1);
			if(counter < 16){
					length = counter+1;
					counter += 1;
			}
			if(counter == 16){
				rec = 0;
			}
		}
		if(rec == 0){
			pattern[counter] = [n,x,y,z*5];
			redraw(1);
			counter += 1;
			counter %= length;
		}
	}
}

function notein(n,x,y,z){
	if(y == 0){
		length = x+1;
	}
	if(x == 15){
		if(z>0){
			if(y == 1){
				div %= 16;
				div += 1;
			}
			if(y == 3){
				transpose += 1;
				if(transpose > 12){
					transpose = 12;
				}
			}
			if(y == 4){
				transpose -= 1;
				if(transpose < -12){
					transpose = -12;
				}
			}
			if(y == 2){
				if(rec == 0){
					rec = 1;
					pos = 0;
					counter = 0;
					length = 1;
				}
				else if(rec == 1){
					rec = 0;
					length = counter;
					if(length == 0){
						length = 1;
					}
				}
			}
			if(y == 5){
				zprob += 1;
				zprob %= 10;
			}
			if(y == 6){
				for(var i=0;i<16;i++){
					var rn = Math.floor(Math.random()*44)+36
					if(rn <= 70){
						pattern[i][0] = rn;
						pattern[i][1] = ((pattern[i][0]-36)%5);
						pattern[i][2] = 7-(Math.floor((pattern[i][0]-36)/5));
						pattern[i][3] = 5;
					}
				}
			}
			redraw(1);
		}
	}
	if(y > 0 && x < 15){
		write(n,x,y,z);
		if(n != -1){
			outlet(1,n);
		}
	}
}

function clock(){
	if(divcount == 0){
		if(zprob <= Math.random()*10){
			pos += 1;
			pos %= length;
			if(pattern[pos][0] != -1){
				outlet(1,pattern[pos][0]+transpose);
			}
			redraw(1);
		}
		if(zprob > Math.random()*10){
			pos += 1;
			pos %= length;
			redraw(0);
		}
	}
	divcount += 1;
	divcount %= div;
}

function redraw(s){
	outlet(0, "clear");
	outlet(0,pos,0,10);
	outlet(0,(length-1),0,15);
	outlet(0,15,1,div);
	if(rec == 0){
		outlet(0,15,2,5);
	}
	if(rec > 0){
		outlet(0,15,2,rec*15);
	}
	if(transpose > 0){
		outlet(0,15,3,transpose);
		outlet(0,15,4,0);
	}
	if(transpose < 0){
		outlet(0,15,3,0);
		outlet(0,15,4,Math.abs(transpose));
	}
	if(transpose == 0){
		outlet(0,15,3,0);
		outlet(0,15,4,0);
	}
	outlet(0,15,5,zprob);
	outlet(0,15,6,5);
	for(var i=0;i<length;i++){
		outlet(0,pattern[i][1],pattern[i][2],pattern[i][3]);
	}
	if(s == 1){
		outlet(0,pattern[pos][1],pattern[pos][2],10);
	}
	if(s == 0){
		outlet(0,15,7,10);
	}
}
