var pickTime;
var reserveTime;
var teamACounting =false;
var teamAUsingReserve = false;
var teamACountInterval;
var teamAPickTime;
var teamAReserveTime;
var teamBCounting =false;
var teamBUsingReserve = false;
var teamBCountInterval;
var teamBPickTime;
var teamBReserveTime;
var tekkieCharCount;
var tekkieChars = [
"Alisa",
"Asuka",
"Bob",
"Bryan",
"Claudio",
"Devil Jin",
"Dragonov",
"Eddy",
"Gigas",
"Heihachi",
"Hwoarang",
"JACK-7",
"Jin",
"Josie",
"Katarina",
"Kazumi",
"Kazuya",
"King",
"Kuma and Panda",
"Lars",
"Law",
"Lee",
"Leo",
"Lili",
"Lucky Chloe",
"Master Raven",
"Miguel",
"Nina",
"Paul",
"Shaheen",
"Steve Fox",
"Ling Xiaoyu",
"Yoshimitsu",
"Akuma",
"Negan",
"Leroy",
"Ganryu",
"Julia",
"Feng",
//"Fahkumram",
"Anna",
"Eliza",
"Lei",
"Geese",
"Noctis",
"Armor King",
"Zafina",
"Marduk"
];

function SetTimers(ev){
  var teamAPickButton = document.getElementById("APickButton");
  var teamBPickButton = document.getElementById("BPickButton");
  var teamAPickText = document.getElementById("Apick");
  var teamAReserveText = document.getElementById("Areserve");
  var teamBPickText = document.getElementById("Bpick");
  var teamBReserveText = document.getElementById("Breserve");

  pickTime = teamAPickText.value;
  reserveTime = teamAReserveText.value;
  teamBPickText.value = pickTime;
  teamBReserveText.value = reserveTime;
  teamAReserveTime=reserveTime;
  teamBReserveTime=reserveTime;
  document.getElementById("BPickButton").style.display = 'inline';
  teamAPickButton.onclick = StartStopATimer;
  teamAPickButton.innerText = "Start Timer";
  teamBPickButton.onclick = StartStopBTimer;
  teamBPickButton.innerText = "Start Timer";
  play();
  playmus();
}
//a timers
function StartStopATimer(ev){
  var teamAPickButton = document.getElementById("APickButton");
  var teamAPickText = document.getElementById("Apick");
  var teamAReserveText = document.getElementById("Areserve");
  if(teamACounting == false){
    currentSound = "radPick";
    setSoundFile(currentSound);
    play();
    teamAPickButton.innerText = "Stop Timer";
    teamACounting = true;
    teamAPickTime = pickTime;
    teamAPickText.value = teamAPickTime;
    teamAUsingReserve = false;
    teamACountInterval = setInterval(APickCountDown, 1000)
  }else{
    teamAPickButton.innerText = "Start Timer";
    teamACounting = false;
    teamAPickTime = pickTime;
    clearInterval(teamACountInterval);
  }
}

function APickCountDown(){
  if(!teamACounting){
    clearInterval(teamACountInterval);
    return;
  }
  var teamAPickText = document.getElementById("Apick");
  var teamAReserveText = document.getElementById("Areserve");
  if(teamAUsingReserve){
    teamAReserveTime-=1;
    teamAReserveText.value = teamAReserveTime;
    if(teamAReserveTime <= 0){
      teamAReserveTime=0;
      teamAReserveText.value = teamAReserveTime;
      clearInterval(teamACountInterval);
      StartStopATimer();
      return;
    }
  }
  else{
    teamAPickTime -= 1;
    teamAPickText.value = teamAPickTime;
    if(teamAPickTime <= 0){
      currentSound = "reserveTime";
      setSoundFile(currentSound);
      play();
      teamAUsingReserve = true;
    }
  }
}

//B timers
function StartStopBTimer(ev){
  var teamBPickButton = document.getElementById("BPickButton");
  var teamBPickText = document.getElementById("Bpick");
  var teamBReserveText = document.getElementById("Breserve");
  if(teamBCounting == false){
    currentSound = "direPick";
    setSoundFile(currentSound);
    play();
    teamBPickButton.innerText = "Stop Timer";
    teamBCounting = true;
    teamBPickTime = pickTime;
    teamBPickText.value = teamBPickTime;
    teamBUsingReserve = false;
    teamBCountInterval = setInterval(BPickCountDown, 1000)
  }else{
    teamBPickButton.innerText = "Start Timer";
    teamBCounting = false;
    teamBPickTime = pickTime;
    clearInterval(teamBCountInterval);
  }
}

function BPickCountDown(){
  if(!teamBCounting){
    clearInterval(teamBCountInterval);
    return;
  }
  var teamBPickText = document.getElementById("Bpick");
  var teamBReserveText = document.getElementById("Breserve");
  if(teamBUsingReserve){
    teamBReserveTime-=1;
    teamBReserveText.value = teamBReserveTime;
    if(teamBReserveTime <= 0){
      teamBReserveTime=0;
      teamBReserveText.value = teamBReserveTime;
      clearInterval(teamBCountInterval);
      StartStopBTimer();
      return;
    }
  }
  else{
    teamBPickTime -= 1;
    teamBPickText.value = teamBPickTime;
    if(teamBPickTime <= 0){
      currentSound = "reserveTime";
      setSoundFile(currentSound);
      play();
      teamBUsingReserve = true;
    }
  }
}

function allowDrop (ev) {
   ev.preventDefault ();
}

function drag (ev) {
  ev.dataTransfer.setData ("src", ev.target.id);
}

function drop (ev) {
  ev.preventDefault ();
  var src = document.getElementById (ev.dataTransfer.getData ("src"));
  var srcParent = src.parentNode;
  var tgt = ev.currentTarget.firstElementChild;
  if(tgt == null){
    src.parentElement.removeChild(src);
    ev.target.appendChild(src);
    return;
  }
  ev.currentTarget.replaceChild (src, tgt);
  srcParent.appendChild (tgt);
}

function ClearSearchField(){
  var search = document.getElementById("search");
  search.value = "";
  hideDivs();
}

function pickRandom(){
  var button =  document.getElementById("randomButton");
  var rand = Math.floor((Math.random() * (tekkieCharCount - 0) + 0));
  //button.innerText = tekkieChars[rand];
  var search = document.getElementById("search");
  search.value = tekkieChars[rand];
  hideDivs();
}

function hideDivs(){
  var db = document.body.getElementsByTagName('img');
  var search = document.getElementById("search");
  
  for(var i = 0; i< db.length; i++){
    if(db[i].parentElement.parentElement.id != "characters"){
      continue;
    }
    var s = db[i].id;
    if(search.value == ""){
      db[i].style.display = 'block'; 
    }
    if(!s.includes(search.value.toLowerCase())){
      db[i].style.display = 'none';
      db[i].parentElement.style.display='none';
    }else{
      db[i].style.display = 'block'; 
      db[i].parentElement.style.display='block';
    }
  }

  var db2 = document.body.getElementsByTagName('div');
  for(var x = 0; x < db2.length; x ++){
    if(!db2[x].id.toLowerCase().includes("char")){
      continue;
    }
    if(db2[x].firstElementChild == null){
      if(search.value == ""){
        db2[x].style.display = 'block';
      }else{
        db2[x].style.display = 'none';
      }
    }
  }
}



window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

window.onload=function() {
  document.getElementById("BPickButton").style.display = 'none';
  this.tekkieCharCount=this.tekkieChars.length;
  if(screen.width == 1920){
    document.body.style.zoom="120%"
  }
  var volumeControl = document.getElementById('vol-control');
  var volumeMusControl = document.getElementById('mus-control');
  volumeControl.addEventListener('change', changevolume);
  volumeControl.addEventListener('input', changevolume);
  volumeMusControl.addEventListener('change', changemusvolume);
  volumeMusControl.addEventListener('input', changemusvolume);
  volumeMusControl.value = musvolume*100;
  volumeControl.value = volume*100;
  currentFile = sCaptsDraft;
  soundFile.appendChild(sCaptsDraft);
}


volume = 0.25;
musvolume = 0.1;
currentFile = "";

//Create the audio tag
var soundFile = document.createElement("audio");
soundFile.preload = "auto";

//Create the audio tag
var musFile = document.createElement("audio");
musFile.preload = "auto";

var sMus = document.createElement("source");
sMus.src = "audio/Tekken Tag Tournament 2 OST Yur Sunset.mp3";
musFile.appendChild(sMus);


//Load the sound file (using a source element for expandability)
var sCaptsDraft = document.createElement("source");
sCaptsDraft.src = "audio/Dlc_rick_and_morty_announcer_captains_draft_02.mp3";
soundFile.appendChild(sCaptsDraft);

var sDirePick = document.createElement("source");
sDirePick.src = "audio/Dlc_rick_and_morty_announcer_dire_team_pick_02.mp3";

var sRadPick = document.createElement("source");
sRadPick.src = "audio/Dlc_rick_and_morty_announcer_radiant_team_pick_02.mp3";

var sDireBan = document.createElement("source");
sDireBan.src = "audio/Dlc_rick_and_morty_announcer_dire_team_ban_03.mp3";

var sRadBan = document.createElement("source");
sRadBan.src = "audio/Dlc_rick_and_morty_announcer_radiant_team_ban_02.mp3";

var sReserveTime = document.createElement("source");
sReserveTime.src = "audio/Dlc_rick_and_morty_announcer_reserve_time_04.mp3";

/*
var sCaptsDraft = document.createElement("source");
sCaptsDraft.src = "audio/Dlc_lina_announcer_type_capt_draft.mp3";
soundFile.appendChild(sCaptsDraft);

var sDirePick = document.createElement("source");
sDirePick.src = "audio/Dlc_lina_announcer_pick_dire_01.mp3";

var sRadPick = document.createElement("source");
sRadPick.src = "audio/Dlc_lina_announcer_pick_rad_01.mp3";

var sDireBan = document.createElement("source");
sDireBan.src = "audio/Dlc_lina_announcer_ban_dire_01.mp3";

var sRadBan = document.createElement("source");
sRadBan.src = "audio/Dlc_lina_announcer_ban_rad.mp3";

var sReserveTime = document.createElement("source");
sReserveTime.src = "audio/Dlc_lina_announcer_time_reserve_01.mp3";
*/


currentSound = "draft";

function setSoundFile(clip){
  switch(clip){
    case "draft":
      soundFile.removeChild(currentFile);
      soundFile.appendChild(sCaptsDraft);
      currentFile = sCaptsDraft;
      break;
    case "direPick":
      soundFile.removeChild(currentFile);
      soundFile.appendChild(sDirePick);
      currentFile = sDirePick;
      break;
    case "radPick":
      soundFile.removeChild(currentFile);
      soundFile.appendChild(sRadPick);
      currentFile = sRadPick;
      break;
    case "direBan":
      soundFile.removeChild(currentFile);
      soundFile.appendChild(sDireBan);
      currentFile = sDireBan;
      break;
    case "radBan":
      soundFile.removeChild(currentFile);
      soundFile.appendChild(sRadBan);
      currentFile = sRadBan;
      break;
    case "reserveTime":
      soundFile.removeChild(currentFile);
      soundFile.appendChild(sReserveTime);
      currentFile = sReserveTime;
      break;
  }
}

//Plays the sound
function play() {
  soundFile.load();
   //Set the current time for the audio file to the beginning
   soundFile.currentTime = 0.01;
   soundFile.volume = volume;
   //Due to a bug in Firefox, the audio needs to be played after a delay
   setTimeout(function(){soundFile.play();},1);
}

function changevolume() {
  var volumeControl = document.getElementById('vol-control');
  var x = volumeControl.value;
  var y = x / 100;
  if(y < 0.1){
    y=0.1;
  }
  volume = y;
 
 }

 function changemusvolume() {
  var volumeMusControl = document.getElementById('mus-control');
  var x = volumeMusControl.value;
  var y = x / 100;
  musvolume = y;
  if(musvolume < 0.1){
    musvolume = 0.1;
  }
  musFile.volume = musvolume;
  musFile.play();
 }

 //Plays the sound
function playmus() {
    musFile.load();
   //Set the current time for the audio file to the beginning
   musFile.currentTime = 0.01;
   musFile.volume = musvolume;
   musFile.loop = true;
   //Due to a bug in Firefox, the audio needs to be played after a delay
   setTimeout(function(){musFile.play();},1);
}


  //Protect only once per browser session? (0=no, 1=yes)
   //Specifying 0 will cause protect to load every time page is loaded
   var once_per_session=1
   var bool

   function get_cookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
      offset = document.cookie.indexOf(search)
      if (offset != -1) { // if cookie exists
          offset += search.length
          // set index of beginning of value
          end = document.cookie.indexOf(";", offset);
          // set index of end of cookie value
          if (end == -1)
               end = document.cookie.length;
          returnvalue=unescape(document.cookie.substring(offset, end))
          }
     }
    return returnvalue;
   }

   function passwordProtect(){
       var password;
       var pass1 = "bigchungus";
       password = prompt('Enter password to view page: ',' ');
       if(password === pass1){
           alert('Correct password, click ok to enter');
           return true;
       }
       else {
           passwordProtect();
           return false;
       }
   }

   function loadornot(){
       if (get_cookie('protect')===''){
           bool = passwordProtect();
           if(bool === true)
               document.cookie="protect=yes";
       }
   }

   if (once_per_session===0)
       passwordProtect()
   else
       loadornot()