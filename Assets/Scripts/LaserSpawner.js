#pragma strict

//static spawn times of the lasers and variance (add elements of randomness)
static var normal_spawn_time : float = 10;
static var spread_spawn_time : float = 16;
static var side_spawn_time : float = 10;
static var variance : float = 4;

private var timer : float = 0;

//Laser game object
var lazer : GameObject;

var controller : GameObject;

//Transform component of the spawner
private var trans : Transform;

function Start () {
	trans = GetComponent.<Transform>();

	InvokeRepeating("SpawnNormalLaser",2,Random.Range(normal_spawn_time-variance,normal_spawn_time + variance));

	InvokeRepeating("SpawnSpreadLaser",6,Random.Range(spread_spawn_time-variance,spread_spawn_time + variance));
	
}

function Update () {
	timer += Time.deltaTime;

	if(timer > side_spawn_time){
		timer = 0;
		StartCoroutine(SpawnSideLaser(Random.Range(0,3)));
	}

	if(controller.GetComponent.<GameController>().game_end == true){
		CancelInvoke();
	}
}
//Cancels the invokation and restarts it
function Cancel(){
	CancelInvoke();

	InvokeRepeating("SpawnNormalLaser",2,Random.Range(normal_spawn_time-variance,normal_spawn_time + variance));

	InvokeRepeating("SpawnSpreadLaser",6,Random.Range(spread_spawn_time-variance,spread_spawn_time + variance));
}

// Spawns a normal laser that aims at the player
function SpawnNormalLaser() {
	var clone = Instantiate(lazer,trans.position,trans.rotation);
	var target2 = GameObject.Find("Player");
	if(target2!=null){	
		clone.GetComponent.<Transform>().LookAt(target2.GetComponent.<Transform>());
	}
}

// Spawns lasers in a spread pattern
function SpawnSpreadLaser(){
	var randomnum = Random.Range(5,50);
	var target = GameObject.Find("Player");

	if(target!=null){	

		var clone1 = Instantiate(lazer,trans.position,trans.rotation);
		clone1.GetComponent.<Transform>().LookAt(target.GetComponent.<Transform>());
		clone1.GetComponent.<Transform>().Rotate(0,randomnum,0);

		var clone2 = Instantiate(lazer,trans.position,trans.rotation);
		clone2.GetComponent.<Transform>().LookAt(target.GetComponent.<Transform>());

		var clone3 = Instantiate(lazer,trans.position,trans.rotation);
		clone3.GetComponent.<Transform>().LookAt(target.GetComponent.<Transform>());
		clone3.GetComponent.<Transform>().Rotate(0,-randomnum,0);

	}
}

function SpawnSideLaser(side : int){

	//Debug.Log("Side!");
	
	var clone : GameObject;
	var target2 : GameObject = GameObject.Find("Player");

	switch(side){
		case 0: clone = Instantiate(lazer,Vector3(Random.Range(-17,17),2,17),trans.rotation);break;
		case 1: clone = Instantiate(lazer,Vector3(Random.Range(-17,17),2,-17),trans.rotation);break;
		case 2: clone = Instantiate(lazer,Vector3(17,2,Random.Range(-17,17)),trans.rotation);break;
		case 3: clone = Instantiate(lazer,Vector3(-17,2,Random.Range(-17,17)),trans.rotation);break;
	}

	if(target2!=null){	
		clone.GetComponent.<Transform>().LookAt(target2.GetComponent.<Transform>());
	}

	yield WaitForSeconds(0.5);

	switch(side){
		case 0: clone = Instantiate(lazer,Vector3(Random.Range(-17,17),2,17),trans.rotation);break;
		case 1: clone = Instantiate(lazer,Vector3(Random.Range(-17,17),2,-17),trans.rotation);break;
		case 2: clone = Instantiate(lazer,Vector3(17,2,Random.Range(-17,17)),trans.rotation);break;
		case 3: clone = Instantiate(lazer,Vector3(-17,2,Random.Range(-17,17)),trans.rotation);break;
	}

	if(target2!=null){	
		clone.GetComponent.<Transform>().LookAt(target2.GetComponent.<Transform>());
	}

	yield WaitForSeconds(0.5);


	switch(side){
		case 0: clone = Instantiate(lazer,Vector3(Random.Range(-17,17),2,17),trans.rotation);break;
		case 1: clone = Instantiate(lazer,Vector3(Random.Range(-17,17),2,-17),trans.rotation);break;
		case 2: clone = Instantiate(lazer,Vector3(17,2,Random.Range(-17,17)),trans.rotation);break;
		case 3: clone = Instantiate(lazer,Vector3(-17,2,Random.Range(-17,17)),trans.rotation);break;
	}

	if(target2!=null){	
		clone.GetComponent.<Transform>().LookAt(target2.GetComponent.<Transform>());
	}
}