#pragma strict

private var text : Text;

function Start () {
	text = GetComponent.<UnityEngine.UI.Text>();
}

//Constantly change the timer
function Update () {
	var score = Mathf.Round(GameObject.Find("Global Game Controller").GetComponent.<GameController>().score);
	text.text = "Score: " +  score;	
}