#pragma strict

//Timer to track when the amp dissapears
var timer : float = 0;
var timer2 : float = 0;

//Radius of the ampflifier
private var rad : float = 1;


//Set the radius to 1
function Start () {
	GetComponent.<Renderer>().material.color.a = 0.5;

	GetComponent.<Transform>().localScale.x = 1;
	GetComponent.<Transform>().localScale.y = 1;
	GetComponent.<Transform>().localScale.z = 1;

	InvokeRepeating("IncreaseRad",0,0.05);



}

//After 8 seconds, destroy the amplifier
function Update () {
	timer += Time.deltaTime;

	if(timer > 8){
		Destroy(this.gameObject);
	}



}

//Increases the radius of the amplifier until it reaches a radius of 10;
function IncreaseRad(){
	rad+=0.25;
	//Debug.Log(rad);

	if(rad > 15){
		CancelInvoke();
	}

	GetComponent.<Transform>().localScale.x=rad;
	GetComponent.<Transform>().localScale.y=rad;
	GetComponent.<Transform>().localScale.z=rad;



}
