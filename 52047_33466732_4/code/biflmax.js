inlets = 1;
outlets = 4;

function bang()
{
	outlet(0,"bang");
}

function msg_int(i)
{
  outlet(1,i);
}

function msg_float(f)
{
  outlet(2,f);
}

function list()
{
  var a = arrayfromargs(arguments);
  outlet(3,a);
}
