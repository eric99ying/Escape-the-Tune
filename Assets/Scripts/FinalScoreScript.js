#pragma strict

var controller : GameObject;

function Start () {

}

function Update () {

}

function OnEnable(){
	GetComponent.<Transform>().GetChild(1).GetComponent.<UnityEngine.UI.Text>().text = "Score: " + controller.GetComponent.<GameController>().score;
	GetComponent.<Transform>().GetChild(2).GetComponent.<UnityEngine.UI.Text>().text = "Timer: " + Mathf.Round(controller.GetComponent.<GameController>().timer*100.0)/100.0;
	var num = Mathf.Round(controller.GetComponent.<GameController>().score * controller.GetComponent.<GameController>().timer * 100)/100;

	GetComponent.<Transform>().GetChild(5).GetComponent.<UnityEngine.UI.Text>().text = "Final Score: " + num;
}