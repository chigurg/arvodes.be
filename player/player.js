//player
document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var player;
var playButton;
var pauseButton;
var progressEl = document.getElementById('timeline');
var loopDuration = 0.5 * 60 * 60; // 2 hours in seconds
var isRadioMode = true; // Enable radio sync mode

playButton = document.getElementById("pause");
pauseButton = document.getElementById("play");
player = document.getElementById('audio-element');

// Ensure UI matches actual audio state
function updatePlayPauseUI() {
    try {
        if (!player) return;
        const playEl = document.getElementById('play');
        const pauseEl = document.getElementById('pause');
        if (player.paused) {
            if (pauseEl) pauseEl.style.display = 'none';
            if (playEl) playEl.style.display = 'block';
        } else {
            if (playEl) playEl.style.display = 'none';
            if (pauseEl) pauseEl.style.display = 'block';
        }
    } catch (e) {
        console.warn('updatePlayPauseUI error', e);
    }
}

// keep UI in sync when playback state changes
if (player) {
    player.addEventListener('play', updatePlayPauseUI);
    player.addEventListener('pause', updatePlayPauseUI);
}

// Calculate current position in 2-hour loop based on time of day
function getLoopPosition() {
    const now = new Date();
    const secondsToday = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
    return secondsToday % loopDuration;
}

//functions play pause etc
function startplayer() { 
    player.controls = false;
    volumeValue = document.getElementById("volumeslider").value;
    slider.style.backgroundSize = volumeValue + '% 100%';
    
    // For radio mode, sync audio to current time when it loads
    if (isRadioMode && player.duration) {
        syncToCurrentTime();
    } else if (isRadioMode) {
        // Wait for metadata to load before syncing
        player.addEventListener('loadedmetadata', syncToCurrentTime, { once: true });
    }
    // Set initial play/pause button state
    updatePlayPauseUI();
}

function syncToCurrentTime() {
    if (isRadioMode && player.duration >= loopDuration) {
        const targetTime = getLoopPosition();
        player.currentTime = targetTime;
        console.log(`Radio synced to ${Math.floor(targetTime / 60)}:${(targetTime % 60).toString().padStart(2, '0')}`);
    }
}

// Keep syncing in radio mode to handle drift
setInterval(() => {
    if (isRadioMode && player.duration && !mouseDownOnSlider && player.currentTime > 0) {
        const expectedTime = getLoopPosition();
        const drift = Math.abs(player.currentTime - expectedTime);
        // Resync if drift is more than 2 seconds
        if (drift > 2) {
            player.currentTime = expectedTime;
        }
    }
}, 10000); // Check every 10 seconds

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

//volume buttons
var iconVolMu = document.getElementById("volMu");
var iconVolLo = document.getElementById("volLo");
var iconVolHi = document.getElementById("volHi");

var slider = document.getElementById("volumeslider");

function change_volIcon(){
    if (volumeValue < 1){
        iconVolMu.setAttribute('data-volLevel', '1');
        iconVolLo.removeAttribute('data-volLevel');
        iconVolHi.removeAttribute('data-volLevel');
    } else if (volumeValue < 40) {
        iconVolMu.removeAttribute('data-volLevel');
        iconVolLo.setAttribute('data-volLevel', '1');
        iconVolHi.removeAttribute('data-volLevel');
    } else if (volumeValue > 30) {
        iconVolMu.removeAttribute('data-volLevel');
        iconVolLo.removeAttribute('data-volLevel');
        iconVolHi.setAttribute('data-volLevel', '1');
    }
}

function change_vol(){
    volumeValue = document.getElementById("volumeslider").value;
    slider.style.backgroundSize = volumeValue + '% 100%';
    change_volIcon();
    player.volume = volumeValue/100;
    return;
}

var oldVol;
function mute(){
    if(player.volume > 0.01){
        oldVol = player.volume;
        player.volume = 0;
        volumeBar.value = 0;
        change_vol();
    } else {
        player.volume = oldVol;
        volumeBar.value = oldVol * 100;
        change_vol();
    }
}

// Rewind and fast forward functions
function rewAudio() {
    if (isRadioMode) {
        // Don't allow manual seeking in radio mode, just sync back to current time
        syncToCurrentTime();
    } else {
        player.currentTime = Math.max(0, player.currentTime - 10);
    }
}

function ffwAudio() {
    if (isRadioMode) {
        // Don't allow manual seeking in radio mode, just sync back to current time
        syncToCurrentTime();
    } else if (player.currentTime + 10 < player.duration) {
        player.currentTime = player.currentTime + 10;
    }
}

// Format time for display
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

let mouseDownOnSlider = false;
player.addEventListener("timeupdate", () => {
    if (!mouseDownOnSlider) {
      progressEl.value = player.currentTime / player.duration * 100;
      // Update duration display
      const durationEl = document.getElementById('duration');
      if (durationEl) {
          durationEl.textContent = formatTime(player.currentTime) + ' / ' + formatTime(player.duration);
      }
    }
});

progressEl.addEventListener("change", () => {
    if (!isRadioMode) {
        const pct = progressEl.value / 100;
        player.currentTime = (player.duration || 0) * pct;
    } else {
        // In radio mode, don't allow seeking
        syncToCurrentTime();
    }
});

var playlist = [];
playlist = Array.prototype.map.call(document.querySelector("#playlist").children, (e => e.textContent))


startplayer();