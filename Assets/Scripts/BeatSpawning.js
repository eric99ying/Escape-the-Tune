#pragma strict
import System.IO;

//Spawning variables
var spawn_time : float;
var variance : float;
var beat : GameObject;

//Imported text assets
var text1 : TextAsset;
var text2 : TextAsset;
var text3 : TextAsset;
var text4 : TextAsset;
var text5 : TextAsset;

//Reference to controller
var controller : GameObject;

private var song : AudioClip;

private var trans : Transform;

//Array to store the timestamps of the song
var timestamps : Array;

var temptime : float = 0;

//For the beat spawning
private var i : int = 0;

//The time it takes for a beat to reach the top of the hit box
private var BEAT_TIME : float = 1.631311;

private var timer : float = BEAT_TIME;

private var invoked : boolean = false;

//Invokes spawn over and over
function Start () {
	trans = GetComponent.<Transform>();
	timestamps = new Array();
	var song_text : TextAsset;

	//Depending on the level, load different text files
	if(GameObject.Find("Global Game Controller").GetComponent.<GameController>().level==1){
		song_text = text2;
	}

	else if(GameObject.Find("Global Game Controller").GetComponent.<GameController>().level==2){
		song_text = text1;
	}

	else if(GameObject.Find("Global Game Controller").GetComponent.<GameController>().level==3){
		song_text = text3;
	}

	else if(GameObject.Find("Global Game Controller").GetComponent.<GameController>().level==4){
		song_text = text4;
	}

	else if(GameObject.Find("Global Game Controller").GetComponent.<GameController>().level==5){
		song_text = text5;
	}

	else if(GameObject.Find("Global Game Controller").GetComponent.<GameController>().level==6){
		//song_text = text4;
	}


	//Takes a text asset and converts it into an array of floats of time values of beats

	var full_string : String = song_text.text;

	var string_array : Array = full_string.Split();

	for(var i=0;i<string_array.length-1;i++){
		if(i%3==0){

			var timestamp : float = float.Parse(string_array[i] as String);

			timestamps.Add(timestamp);

		}	
	}

	Debug.Log(timestamps);
	//Spawn();
	yield;
	song = controller.GetComponent.<GameController>().song.clip;

	//InvokeRepeating("PlaySong",0,Time.deltaTime);

	


}

//Merely for debugging purposes
function Update () {
	temptime+=Time.deltaTime;

	//if(Input.GetKeyDown("c")){
		//Debug.Log(temptime);
		//temptime = 0;
	//}

	if(Input.GetKeyDown("space") && !invoked){
		invoked = true;
	}

	if(invoked){
		Invoke("PlaySong",Time.deltaTime);
	}

}

//Spawn a beat
function Spawn(){
	Instantiate(beat,trans.position,trans.rotation);
}


//Updates a timer and spawn beats according to the timestamps in the timestamp array

function PlaySong(){	
	//Debug.Log("sdf");
	//Debug.Log(i + " " + timer);
	//Add to timer
	timer+=Time.deltaTime;

	var time : float;
	//Debug.Log(i);
	//If the entire timestamp hasn't gone through the loop yet, play the beat and increment i 
	if(i<timestamps.length){
		time = timestamps[i];
		if(timer > time){
			i++;
			//Debug.Log("asd");
			Spawn();
		}
	}//Otherwise, do nothing until the song ends, then reset i and the timer
	else{
		if(timer-BEAT_TIME>song.length){
			i = 0;
			timer = BEAT_TIME;
		}else{
			//Debug.Log("Doing nothing");
		}
	}

}

