#pragma strict

private var trans : Transform;

//Controller
var controller : GameObject;

//Reference to player ship
var player : GameObject;

//Reference to the text
var text : GameObject;

private var timer : float;

function Start () {
	trans = GetComponent.<Transform>();
}

//Makes the particles follow the player ship
function Update () {	
	timer+=Time.deltaTime;
	if(controller.GetComponent.<GameController>().game_end==false && trans != null){
		trans.position = player.GetComponent.<Transform>().position;
	}
	if(timer > 5){
  		gameObject.SetActive(false);
	}
}

function OnEnable(){
	if(player!=null){	
		player.GetComponent.<PlayerController>().invincible = true;
		timer = 0;
		text.SetActive(true);
	}
}

function OnDisable(){
	if(player!=null){
		player.GetComponent.<PlayerController>().invincible = false;
		text.SetActive(false);
	}
}