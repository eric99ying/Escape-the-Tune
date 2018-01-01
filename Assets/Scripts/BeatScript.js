#pragma strict

private var rb : Rigidbody;
private var trans : Transform;

//Speed of the beat
var speed : float;

//References to other objects
var trigger : GameObject;
var controller : GameObject;

var timer : float = 0;

//Push the sphere towards the beat hitter
function Start () {
	rb = GetComponent.<Rigidbody>();
	trans = GetComponent.<Transform>();

	controller = GameObject.FindWithTag("GameController");

	trans.Rotate(0,0,90);
}

// The beat moves forward until it falls off
// If the beat is able to be hit and space is pressed, the beat is destroyed and life is increased by 10
function Update () {

	//rb.AddForce(Vector3(0,0,speed));
	trans.Translate(0,0,speed*Time.deltaTime);

	if(trans.position.z<-20){
		Destroy(this.gameObject);
	}
}


// Collsion enter
function OnCollisionEnter(hit : Collision){
	rb.constraints = RigidbodyConstraints.FreezePositionY;
}

// Collsion exit
function OnCollisionExit(hit : Collision){
	rb.constraints = RigidbodyConstraints.None;

}
