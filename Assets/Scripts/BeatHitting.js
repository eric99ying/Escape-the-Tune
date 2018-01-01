#pragma strict

private var canHit : boolean  = false;

var controller : GameObject;

function Start () {

}

//If space is pressed, hit the beat
function Update () {
	if(Input.GetKeyDown("space") && !canHit){
		//controller.GetComponent.<GameController>().EnableBadText2();
		controller.GetComponent.<GameController>().LoseLife(2);
	}
}

// When the beat enters the trigger
function OnTriggerEnter(hit : Collider){
	//Debug.Log("Entered! Time : " + timer);
	if(hit.gameObject.tag=="Beat"){
		canHit = true;
	}
}

// When the beat exits the trigger, lose some life
function OnTriggerExit(hit : Collider){
	//Debug.Log("Exit!");
	if(hit.gameObject.tag=="Beat"){
		canHit = false;
		controller.GetComponent.<GameController>().EnableBadText();
		controller.GetComponent.<GameController>().combo = 1;
		controller.GetComponent.<GameController>().LoseLife(10);
	}

}

function OnTriggerStay(hit : Collider){
	canHit = true;
	if(hit.gameObject.tag == "Beat"){
		if(Input.GetKeyDown("space")){
			//Calls controller to enable text
			controller.GetComponent.<GameController>().EnableGoodText();
			controller.GetComponent.<GameController>().AddLife(15);
			controller.GetComponent.<GameController>().AddScore(controller.GetComponent.<GameController>().combo);
			controller.GetComponent.<GameController>().combo++;
			//yield;
			//justHit = true;

			//Enable invincility if the player reaches a combo of 30 or a mulitple of 30
			if (controller.GetComponent.<GameController>().combo % 30 == 0){
				controller.GetComponent.<GameController>().EnableInvincibility();
		
			}

			Destroy(hit.gameObject);
			canHit = false;
		}	
	}
}

