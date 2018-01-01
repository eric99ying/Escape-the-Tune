#pragma strict

import UnityEngine.SceneManagement;
var instructions : GameObject;
var credit : GameObject;
var dropdown : GameObject;

function Start () {

}

function Update () {

}

function LoadActualLevel(){
	SceneManager.LoadScene("Level_1");
}

function OpenInstructions(){
	if(dropdown != null) dropdown.gameObject.SetActive(false);
	if(instructions != null) instructions.gameObject.SetActive(true);

}

function CloseInstructions(){
	if(dropdown != null) dropdown.gameObject.SetActive(true);
	if(instructions != null) instructions.gameObject.SetActive(false);

}

function OpenCredit(){
	if(dropdown != null) dropdown.gameObject.SetActive(false);
	if(credit != null)credit.gameObject.SetActive(true);
}

function CloseCredits(){
	if(dropdown != null) dropdown.gameObject.SetActive(true);
	if(credit != null) credit.gameObject.SetActive(false);
}

function BackToMainMenu(){
	SceneManager.LoadScene("GameMenu");
}