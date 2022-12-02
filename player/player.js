//player
document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var player;
var playButton;
var pauseButton;

//functions play pause etc
function startplayer() { 
    player = document.getElementById('audio-element');
    playButton = document.getElementById("pause");
    pauseButton = document.getElementById("play");
    player.controls = false; 
}

function playAudio() {
    player.play();
    playButton.style.display = "block";
    pauseButton.style.display = "none";
} 

function pauseAudio() {
    player.pause();
    document.getElementById("pause").style.display = "none";
    document.getElementById("play").style.display = "block";
}

// function stop_aud() {player.pause(); player.currentTime = 0;}
var volumeValue = document.getElementById("volumeslider").value;

var iconVolMu = document.getElementById("volMu");
var iconVolLo = document.getElementById("volLo");
var iconVolHi = document.getElementById("volHi");

function change_vol(){ 
    if (volumeValue <= 0){
        iconVolMu.dataset.volLevel = "active";
        iconVolLo.dataset.volLevel = "inactive";
        iconVolHi.dataset.volLevel = "inactive";
    } else if (volumeValue <= 0.33) {
        iconVolMu.dataset.volLevel = "inactive";
        iconVolLo.dataset.volLevel = "active";
        iconVolHi.dataset.volLevel = "inactive";
    } else if (volumeValue > 33) {
        iconVolMu.dataset.volLevel = "inactive";
        iconVolLo.dataset.volLevel = "inactive";
        iconVolHi.dataset.volLevel = "active";
    }
    return volumeValue
}

startplayer();

muState = iconVolMu.dataset.volLevel;



