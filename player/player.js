//player
document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var player;
var playButton;
var pauseButton;
var progressEl = document.getElementById('timeline');
playButton = document.getElementById("pause");
pauseButton = document.getElementById("play");
player = document.getElementById('audio-element');

//functions play pause etc
function startplayer() { player.controls = false; }

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
var volumeBar = document.getElementById("volumeslider");
var volumeValue = document.getElementById("volumeslider").value;
volumeValue = 100;


var iconVolMu = document.getElementById("volMu");
var iconVolLo = document.getElementById("volLo");
var iconVolHi = document.getElementById("volHi");

var slider = document.getElementById("volumeslider");

function muteIcon() {
    iconVolMu.setAttribute('data-volLevel', '1');
    iconVolLo.removeAttribute('data-volLevel');
    iconVolHi.removeAttribute('data-volLevel');
}

function change_vol(){
    volumeValue = document.getElementById("volumeslider").value;
    slider.style.backgroundSize = volumeValue + '% 100%';

    if (volumeValue < 1){
        muteIcon();
    } else if (volumeValue < 40) {
        iconVolMu.removeAttribute('data-volLevel');
        iconVolLo.setAttribute('data-volLevel', '1');
        iconVolHi.removeAttribute('data-volLevel');
    } else if (volumeValue > 30) {
        iconVolMu.removeAttribute('data-volLevel');
        iconVolLo.removeAttribute('data-volLevel');
        iconVolHi.setAttribute('data-volLevel', '1');
    }
    player.volume = volumeValue/100;
    return;
}

function mute(){
    var oldVol;
    oldVol = player.volume;
    if(volumeValue > 1){
        muteIcon();
        player.volume = 0;
        volumeBar.value = 0;
    } else if(volumeValue < 1) {
        //nog een voorwaarde toevoegen zodat de knop ook terug unmute met oldVol
    }
}

let mouseDownOnSlider = false;
player.addEventListener("timeupdate", () => {
    if (!mouseDownOnSlider) {
      progressEl.value = player.currentTime / player.duration * 100;
    }
});

progressEl.addEventListener("change", () => {
    const pct = progressEl.value / 100;
    player.currentTime = (player.duration || 0) * pct;
});

startplayer();