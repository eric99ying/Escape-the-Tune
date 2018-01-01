#pragma strict

//The amp object spawned
var amp : GameObject;

//Timer to track spawning of amps
private var timer : float = 0;

function Start () {
	
}

//Every 12 seconds, spawn an amplifier
function Update () {
	timer+=Time.deltaTime;
	if(timer>12){
		timer = 0;
		Spawn();
	}
}

//Spawns a amplifier anywhere in the field of play
function Spawn(){
	var radius = 15;

	Instantiate(amp,Vector3(Random.Range(-10,10),0,Random.Range(-10,10)),Quaternion.identity);

}