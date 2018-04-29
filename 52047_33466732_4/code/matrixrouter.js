inlets = 1;
outlets = 2;

var state = 1;

function route(x,y,z){
	if(z == 1){
		if(x == 15){
			if(y == 0){
				state = 1;
			}
			if(y == 1){
				state = 2;
			}
			if(y == 2){
				state = 3;
			}
			if(y == 3){
				state = 4;
			}
			outlet(0,state);
			for(var i=0;i<8;i++){
				outlet(1,15,i,0)
			}
			outlet(1,15,state-1,1);
		}
	}
}