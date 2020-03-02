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
"Lucky Chole",
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
"Fahkumram",
"Anna",
"Eliza",
"Lei",
"Geese",
"Noctis",
"Armour King",
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
  document.getElementById("BPickButton").disabled=false;
  teamAPickButton.onclick = StartStopATimer;
  teamAPickButton.innerText = "Start Timer";
  teamBPickButton.onclick = StartStopBTimer;
  teamBPickButton.innerText = "Start Timer";
}
//a timers
function StartStopATimer(ev){
  var teamAPickButton = document.getElementById("APickButton");
  var teamAPickText = document.getElementById("Apick");
  var teamAReserveText = document.getElementById("Areserve");
  if(teamACounting == false){
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
      clearInterval(teamACountInterval);
      StartStopATimer();
      return;
    }
  }
  else{
    teamAPickTime -= 1;
    teamAPickText.value = teamAPickTime;
    if(teamAPickTime <= 0){
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
      clearInterval(teamBCountInterval);
      StartStopBTimer();
      return;
    }
  }
  else{
    teamBPickTime -= 1;
    teamBPickText.value = teamBPickTime;
    if(teamBPickTime <= 0){
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
    var data = ev.dataTransfer.getData("src");
    ev.target.appendChild(document.getElementById(data));
    return;
  }
  ev.currentTarget.replaceChild (src, tgt);
  srcParent.appendChild (tgt);
}

function pickRandom(){
  var button =  document.getElementById("randomButton");
  var rand = Math.floor((Math.random() * tekkieCharCount) + 1);
  button.innerText = tekkieChars[rand];
}


window.onload=function() {
  document.getElementById("BPickButton").disabled=true;
  this.tekkieCharCount=this.tekkieChars.length-1;
}