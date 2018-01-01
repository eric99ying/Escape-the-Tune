#pragma strict

private var combo : Text;

function Start () {
	combo = GetComponent.<UnityEngine.UI.Text>();
}

//Constantly change the timer
function Update () {
	var combonum = GameObject.Find("Global Game Controller").GetComponent.<GameController>().combo;
	combo.text = combonum + "X";	
}