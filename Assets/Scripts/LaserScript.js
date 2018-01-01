#pragma strict

private var trans : Transform;
static var speed : float = 8;

function Start () {
	trans = GetComponent.<Transform>();

}

function Update () {
	trans.Translate(Vector3.forward * speed * Time.deltaTime);

	if(trans.position.x<-50||trans.position.x>50||trans.position.z<-50||trans.position.z>50){
		//Debug.Log("Destroyed!");
		//this.gameObject.SetActive(false);
		Destroy(this.gameObject);
	}

	//GetComponent.<Transform>().Rotate(0,30,0);
}

