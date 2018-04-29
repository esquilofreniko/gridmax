inlets = 1;
outlets = 3;

var counter = 0;
var x=0;
var y=0;
var px=0;
var py=0;
var matrix = Array(128);
var amcounter = 0;
var xy = 0;
var z = 0;
var xdiv = 1;
var ydiv = 1;
var xcount = 0;
var ycount = 0;
var octmin = 0;
var octmax = 0;
var notes = Array(12);
var tmp = 0;
var n1mp = 0;
var n2mp = 0;

clearm();

function clearm(){
	for(var i = 0; i< 128;i++){
		x = 0;
		y = 0;
		matrix[i] = Array(3)
		matrix[i] = [i % 16, Math.floor(i / 16),0];
		if(i>119 && i < 125){
			matrix[i] = [i % 16, Math.floor(i / 16),10];
		}
		if(i == 77 || i == 61){
			matrix[i] = [i % 16, Math.floor(i / 16),10];
		}
	}
  for(var i=0;i<12;i++){
      notes[i] = 1;
  }
  matrix[94][2] = notes[0]*10;
  matrix[95][2] = notes[1]*10;
  matrix[78][2] = notes[2]*10;
  matrix[79][2] = notes[3]*10;
  matrix[62][2] = notes[4]*10;
  matrix[63][2] = notes[5]*10;
  matrix[46][2] = notes[6]*10;
  matrix[47][2] = notes[7]*10;
  matrix[30][2] = notes[8]*10;
  matrix[31][2] = notes[9]*10;
  matrix[14][2] = notes[10]*10;
  matrix[15][2] = notes[11]*10;
}

function xyin(_z,_xy){
	xy = _xy;
	xin = _xy%16;
	yin = Math.floor(_xy/16);
	z = _z;
	if(_z > 0){
		if(xin < 8){
			if(matrix[xy][2] <= 12){
				matrix[xy][2] += 1;
			}
			else if(matrix[xy][2]>12){
				matrix[xy][2] = 0;
			}
      if(xin >= 4 && xin < 8){
        if(notes[matrix[xy][2]] == 0){
          matrix[xy][2] = quantize();
        }
      }
			outlet(0, matrix[xy][0],matrix[xy][1],matrix[xy][2]);
		}
	 	else if(xin >= 8 && xin < 13){
			matrix[xy][2] = 10;
			if (xin == 8){
				xdiv = 8 - yin;
			}
			if (xin == 9){
				ydiv = 8 - yin;
			}
			if (xin == 10){
				tmp = 7 - yin;
			}
			if (xin == 11){
				n1mp = 7 - yin;
			}
			if (xin == 12){
				n2mp = 7 - yin;
			}
			for(var i=0;i<8;i++){
				if(xin + i*16 < xy){
					matrix[xin + i*16][2] = 0;
				}
				if(xin + i*16 >= xy){
					matrix[xin + i*16][2] = 10;
	 			}
			}
		}
		else if(xin == 13){
			if(yin < 4){
				octmax = Math.floor(4 - yin);
				matrix[xy][2] = 10;
				for(var i=0;i<4;i++){
					if(xin + i*16 < xy ){
						matrix[xin + i*16][2] = 0;
					}
					if(xin + i*16 >= xy){
						matrix[xin + i*16][2] = 10;
		 			}
				}
			}
			else if(yin >= 4){
				octmin = Math.floor(yin-4);
				matrix[xy][2] = 10;
				for(var i=0;i<4;i++){
					if(xin + (i+4)*16 > xy){
						matrix[xin + (i+4)*16][2] = 0;
		 			}
					if(xin + (i+4)*16 <= xy ){
						matrix[xin + (i+4)*16][2] = 10;
					}
				}
			}
		}
		if(xy == 126){
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					matrix[i + j * 16][2] = Math.floor(Math.random()*12);
					matrix[i + (j+4) * 16][2] = Math.floor(Math.random()*12);
				}
			}
		}
		else if(xy == 110){
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					matrix[(i+4) + j * 16][2] = quantize();
				}
			}
		}
		else if(xy == 111){
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					matrix[(i+4) + (j+4) * 16][2] = quantize();
				}
			}
		}
		else if(xin >= 14 && yin < 6){
			if(_z > 0){
			if(matrix[_xy][2] == 0){
				matrix[_xy][2] = 10;
				notes[Math.floor((xin - 14) + ((5-yin) * 2))] = 1;
			}
			else{
			matrix[_xy][2] = 0;
          	notes[Math.floor((xin - 14) + ((5-yin) * 2))] = 0;
			}
			}
		}
		redraw();
	}
}

var go = Array(2);
go[0] =0;
go[1] =0;

function clock(ax){
	px = x;
	py = y;
	if(ax == 0){
		counter += 1;
		counter %= 16;
		x = counter % 4;
		y = Math.floor(counter / 4);
	}
	if(ax == 1){
		if(xcount == 0){
			x += 1;
			x %= 4;
		}
		xcount += 1;
		xcount %= xdiv;
	}
	if(ax == 2){
		if(ycount == 0){
			y += 1;
			y %= 4;
		}
		ycount += 1;
		ycount %= ydiv;
	}
	if(n1mp > Math.random()*7){
		matrix[(x+4)+(y*16)][2] = Math.random()*12;
    if(notes[matrix[(x+4)+(y*16)][2]] == 0){
      matrix[(x+4)+(y*16)][2] = quantize();
    }
	}
	if(n2mp > Math.random()*7){
		matrix[(x+4)+((y+4)*16)][2] = Math.random()*12;
    if(notes[matrix[(x+4)+((y+4)*16)][2]] == 0){
      matrix[(x+4)+((y+4)*16)][2] = quantize();
    }
	}
	if(xcount == 0 || ycount == 0){
		for(var i=0; i<2; i++){
			if(tmp > Math.random()*7){
				matrix[x+((y+(4*i))*16)][2] = Math.random()*12;
			}
			if (matrix[x+((y+(4*i))*16)][2]>0){
				if(Math.random()*12 < matrix[x+((y+(4*i))*16)][2]){
					go[i] = 1;
					outlet(0,x,y,15);
					outlet(0,x+4,y,15);
					outlet(2, i, Math.floor(matrix[(x+4)+((y+(4*i))*16)][2] + 36 + (12* Math.floor(Math.random()*octmax)) - (12* Math.floor(Math.random()*octmin))));
				}
			}
		}
	if(go[0] == 1 && go[1] == 1){
		outlet(1,Math.floor(Math.random()*2), "bang");
	}
	if(go[0] == 1 && go[1] == 0){
		outlet(1,0,"bang");
	}
	if(go[0] == 0 && go[1] == 1){
		outlet(1,1,"bang");
	}
	if(go[0] == 0 && go[1] == 0){

	}
	go[0] = 0;
	go[1] = 0;
	redraw();
	}
}

function quantize(){
  var checker = 0;
  var choser = Array(12);
  for(var i=0;i<12;i++){
    if(notes[i] == 1){
      choser[checker] = i;
      checker += 1;
    }
    else{
      notes[i] = 0;
    }
  }
  if(checker == 0){
    notes[0] = 1;
    matrix[94][2] = 10;
  }
  return choser[Math.floor(Math.random()*(checker-1))];
}

function redraw(){
  matrix[94][2] = notes[0]*10;
  matrix[95][2] = notes[1]*10;
  matrix[78][2] = notes[2]*10;
  matrix[79][2] = notes[3]*10;
  matrix[62][2] = notes[4]*10;
  matrix[63][2] = notes[5]*10;
  matrix[46][2] = notes[6]*10;
  matrix[47][2] = notes[7]*10;
  matrix[30][2] = notes[8]*10;
  matrix[31][2] = notes[9]*10;
  matrix[14][2] = notes[10]*10;
  matrix[15][2] = notes[11]*10;
	for(var i = 0; i< 128;i++){
		outlet(0, matrix[i]);
	}
	for(var i=0;i<2;i++){
		for(var j=0;j<2;j++){
			outlet(0,x+(j*4), y+(i*4),13);
		}
	}
}
