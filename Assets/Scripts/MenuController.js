#pragma strict

static var level : int;

var dropdown : GameObject;

function Start () {
	DontDestroyOnLoad(this.gameObject);
}

function Update () {
	if(dropdown!=null){
		level = dropdown.GetComponent.<Dropdown>().value + 1;
	}
}