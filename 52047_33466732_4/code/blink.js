inlets = 1;
outlets =1;

function list()
{
	var a = arrayfromargs(arguments);
	if(a[0] < 15 && a[1] > 0){
		outlet(0,a);	
	}
}
