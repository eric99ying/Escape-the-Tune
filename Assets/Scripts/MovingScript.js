#pragma strict

//Renderer component of the background
private var rend : Renderer;

public var scrollSpeed : float;
private var savedOffset : Vector2;
var controller : GameObject;

private var x : float;
private var y : float;

var player : GameObject;

//Saves the current offset of the ship at the beginning
function Start () {
	rend = GetComponent.<Renderer>();
    savedOffset = rend.sharedMaterial.GetTextureOffset ("_MainTex");
}

//Scroll the background up, down, left, or right based on the direction the ship is going in
function Update () {
	if(controller.GetComponent.<GameController>().game_end == false){
		var dir = player.GetComponent.<PlayerController>().dir;
		var offset : Vector2;

		if(dir==0){
		    y = Mathf.Repeat (Time.time * scrollSpeed, 1);
		    offset = new Vector2 (savedOffset.x, y);
		    rend.sharedMaterial.SetTextureOffset ("_MainTex", offset);
	    }else if(dir==1){
		    x = -Mathf.Repeat (Time.time * scrollSpeed, 1);
		    offset = new Vector2 (x,savedOffset.y);
		    rend.sharedMaterial.SetTextureOffset ("_MainTex", offset);
	    }else if(dir==2){
		    y = -Mathf.Repeat (Time.time * scrollSpeed, 1);
		    offset = new Vector2 (savedOffset.x,y);
		    rend.sharedMaterial.SetTextureOffset ("_MainTex", offset);
	    }else if(dir==3){
		    x = Mathf.Repeat (Time.time * scrollSpeed, 1);
		    offset = new Vector2 (x,savedOffset.y);
		    rend.sharedMaterial.SetTextureOffset ("_MainTex", offset);
	    }
	}
}

