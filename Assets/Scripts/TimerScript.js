#pragma strict
import UnityEngine.UI;

private var text : Text;

function Start () {
	text = GetComponent.<UnityEngine.UI.Text>();
}

//Constantly change the timer
function Update () {
	var time = Mathf.Round(GameObject.Find("Global Game Controller").GetComponent.<GameController>().timer);
	text.text = "Time: " +  time;	
}