#pragma strict

var player : GameObject;

var slider : UnityEngine.UI.Slider;

var controller : GameObject;


function Start () {
	slider = GetComponent.<UnityEngine.UI.Slider>();

}

//Constantly update the value of the slider
function Update () {
	if(!controller.GetComponent.<GameController>().game_end){
		slider.value = player.GetComponent.<GameController>().life;
	}
}

