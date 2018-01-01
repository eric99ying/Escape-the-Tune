#pragma strict

//Transfrom component of the player
private var trans : Transform;

//Calls the game controller when hit
var game_controller : GameObject;

//Explosion
var explosion:GameObject;

//Static speed of the player (8 is default)
static var speed : float = 8;

//Timer for amp score increase
private var timer : float = 0;

//Direction the ship is moving
//0 is up, 1 is right, 2 is down, 3 is left
var dir : int = 2;

//Invincible
var invincible : boolean = false;

//Initialization
function Start () {
	trans = GetComponent.<Transform>();
}

//Handles moving of the player
function Update () {

	//Debug.Log("X: " + trans.position.x);
	//Debug.Log("Z: " + trans.position.z);
	if(!game_controller.GetComponent.<GameController>().game_end){

		if(Input.GetAxis("Horizontal")||Input.GetAxis("Vertical")){
			var hor = Input.GetAxis("Horizontal");
			var ver = Input.GetAxis("Vertical");

			if(hor>0)dir=1;
			if(hor<0)dir=3;
			if(ver>0)dir=0;
			if(ver<0)dir=2;

			var newforward : Vector3 = Vector3(hor,0,ver).normalized;
			if(newforward!=Vector3.zero) trans.forward = newforward;

			trans.Translate(Vector3.forward * speed * Time.deltaTime);
		}
	}

	if(game_controller.GetComponent.<GameController>().life<=0){
		//Debug.Log("You are dead!");
		Instantiate(explosion,new Vector3(trans.position.x,trans.position.y-7,trans.position.z),trans.rotation);
		game_controller.GetComponent.<GameController>().OnDeath();

	}
}

//Trigger enters
function OnTriggerEnter(hit : Collider){
	//If a laser hits the player, the player loses life
	if(hit.gameObject.tag=="Laser"){
		if(!invincible){
			game_controller.GetComponent.<GameController>().LoseLife(20);
			game_controller.GetComponent.<GameController>().FlashRed();

			Destroy(hit.gameObject);
		}

	}else if(hit.gameObject.tag=="Amplifier"){
		timer = 0;
		//Debug.Log("AMP!");
	}
}

function OnTriggerStay(hit : Collider){
	//Debug.Log("Stay");
	if(hit.gameObject.tag=="Amplifier"){
		timer += Time.deltaTime;
		//Debug.Log("Stay");
		if(timer > 1){
			game_controller.GetComponent.<GameController>().AddScore(game_controller.GetComponent.<GameController>().combo);
			timer = 0;
			game_controller.GetComponent.<GameController>().AddLife(5);

		}
	}
}

