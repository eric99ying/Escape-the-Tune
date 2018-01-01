#pragma strict

// Life points of the player, when it reaches zero the game is supposed to end
var life : int = 100;

//Reference to other objects
var message : GameObject;
var message2 : GameObject;
var message3 : GameObject;
var laser : GameObject;

//Timers in order to track difficulty increase and health lose
private var time1 : float = 0;
private var time2 : float = 0;

//The current level and songs
var level : int;
var song : AudioSource;
var star_wars_song : AudioSource;
var bastion_song : AudioSource;
var song_of_storm_song : AudioSource;
var bastion2_song : AudioSource;
var one_direction_song : AudioSource;

//Score of the song
//Score increases after every hit
//Final score is multiplied by the timer
var score : int = 0;

//Combo increases every successful hit of the beat
//Combo resets after every missed beat
var combo : int = 1;

//Actual OFFICIAL timer of the game
var timer : float = 0;

//Flash red object
var flash : GameObject;

//Boolean values to stop the game
var game_end : boolean = false;
var score_panel : GameObject;
var story : GameObject;

//Reference to the player
var player : GameObject;

//Invincibility particles
var invincibility : GameObject;

//Started
var started : boolean = false;

//Set timers to zero and play the level song
function Start () {
	//Set level to the level from the main menu
	if(GameObject.Find("Controller") != null){
		level = GameObject.Find("Controller").GetComponent.<MenuController>().level;
	}else{
		Debug.Log("Not LOADED!");
	}
	//Initially pause the game
	Time.timeScale = 0;

	//Reset all variables
	score = 0;
	timer = 0;
	game_end = false;
	combo = 1;
	life = 100;

	if(level == 1){
		song = star_wars_song;
	}else if(level == 2){
		song = bastion_song;
	}else if(level == 3){
		song = song_of_storm_song;
	}else if(level == 4){
		song = bastion2_song;
	}else if(level == 5){
		song = one_direction_song;
	}else if(level == 6){
		
	}else{
		Debug.Log("Not a valid level.");
	}

	//song.Play();
}

//Loser life continuosuly and increase difficulty eveery 20 seconds
function Update () {
	if(Input.GetKeyDown("space")&&!started){
		started = true;
		Time.timeScale = 1;
		song.Play();
		story.gameObject.SetActive(false);
	}

	time1 += Time.deltaTime;
	time2 += Time.deltaTime;

	if(!game_end){
		timer += Time.deltaTime;
	}
	if(game_end){
		invincibility.SetActive(false);
	}

	if(time1>0.5){
		time1 = 0;
		LoseLife(1);
	}

	if(time2>20){
		time2=0;
		IncreaseDifficulty();
		var spawner = GameObject.Find("Laser Spawner");
		spawner.GetComponent.<LaserSpawner>().Cancel();
	}

}

//Add and Lose life
function AddLife(num : int){
	life += num;
	if(life>100)life=100;
}

function LoseLife(num : int){
	life -= num;
	if(life<0)life=0;
}

//Add and lose score
function AddScore(num : int){
	score += num;
}

//Starts the coroutine of text generation
function EnableGoodText(){
	StartCoroutine(TextRoutine());
}

function EnableBadText(){
	StartCoroutine(TextRoutine2());
}

function EnableBadText2(){
	StartCoroutine(TextRoutine3());
}

//Displays GREAT every hit beat
function TextRoutine(){
	message.GetComponent.<RectTransform>().anchoredPosition = Vector2(Random.Range(100,180),Random.Range(-20,130));
	message.GetComponent.<UnityEngine.UI.Text>().text = "Great!";
	yield WaitForSeconds(1);
	message.GetComponent.<UnityEngine.UI.Text>().text = " ";
}

function TextRoutine2(){
	message2.GetComponent.<RectTransform>().anchoredPosition = Vector2(Random.Range(100,180),Random.Range(-20,130));
	message2.GetComponent.<UnityEngine.UI.Text>().text = "Bad";
	yield WaitForSeconds(1);
	message2.GetComponent.<UnityEngine.UI.Text>().text = " ";
}

function TextRoutine3(){
	message3.GetComponent.<RectTransform>().anchoredPosition = Vector2(Random.Range(100,180),Random.Range(-20,130));
	message3.GetComponent.<UnityEngine.UI.Text>().text = "Miss";
	yield WaitForSeconds(1);
	message3.GetComponent.<UnityEngine.UI.Text>().text = " ";
}

//Increase difficulty by increasing speed of laser and reduceing spawn rates of lasers
//MAYBE make the song faster
function IncreaseDifficulty(){
	//var beat_speed = GameObject.Find("Beat").GetComponent.<BeatScript>().speed;
	//beat_speed += 1;
	var spawner = GameObject.Find("Laser Spawner");

	spawner.GetComponent.<LaserSpawner>().normal_spawn_time-=1;
	Debug.Log("Spawn Time: " + spawner.GetComponent.<LaserSpawner>().normal_spawn_time);
	spawner.GetComponent.<LaserSpawner>().spread_spawn_time-=1;

	//var prefab = PrefabUtility.FindPrefabRoot(laser);
	laser.GetComponent.<LaserScript>().speed += 1;
	Debug.Log("Speed: " + laser.GetComponent.<LaserScript>().speed);

}

//Flash red
function FlashRed(){
	StartCoroutine(flash.GetComponent.<FlashScript>().Flash());
}

//CALLS A COROUTINE
function OnDeath(){
	StartCoroutine(Die());

}

//On death, wait, then destroy the ship and show a score panel 
function Die(){
	yield WaitForSeconds(1);
	Destroy(player.gameObject);
	game_end = true;
	score_panel.SetActive(true);
}

//Enable invincility on the player ship
function EnableInvincibility(){
	invincibility.gameObject.SetActive(true);
}