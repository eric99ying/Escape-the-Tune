#pragma strict

private var timer : float = 0;;

//The transparency is initially 0
function Start () {
	//Flash();
	GetComponent.<Image>().color.a = 0;

}

function Update () {

}


//Flashes red, then fades transparent
function Flash(){

	GetComponent.<Image>().color.a = 0.7;

	yield WaitForSeconds(0.5);

	for (var i = 0.0; i < 1.0; i += Time.deltaTime*(1/0.5)) { 
		GetComponent.<Image>().color.a = Mathf.Lerp(0.7, 0.0, i); 
		yield;
    } 

	GetComponent.<Image>().color.a = 0;

}
