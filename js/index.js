//variables
var shiftX = 0;
var shiftY = 0;

var list, logo, background, navItems, backButton, fwdButton, container, titleBox, textBox;

function initDOM() {
  list = document.getElementById("list");
  logo = document.getElementById("logo");
  background = document.getElementById("background");
  navItems = Array.from(list.children);
  backButton = document.getElementById("back");
  fwdButton = document.getElementById("fwd");
  container = document.getElementById("container");
  titleBox = document.getElementById("title");
  textBox = document.getElementById("content");
}

var address;
var currentMode = null; // 'blips' | 'links' | null

//functions
function startPage() {
  logo.style.color = "white"
}

function shiftBackground(inputX, inputY) {
  shiftX = shiftX + inputX;
  shiftY = shiftY + inputY;
  background.style.transform = 'translate(' + shiftX + '%,'  + shiftY + '%)'
}

//interactivity
function forwards() {
  list.style.transform = "translate(-100%, -100%)"
  container.style.transform = "translate(0%, 0%)"
  backButton.style.transform = "translateX(0%)"
  fwdButton.style.transform = "translateX(0%)"
  shiftBackground(-3,-3);  
}

function back() {
  list.style.transform = "translate(10%, 50%)";
  container.style.transform = "translate(150%, 150%)";
  backButton.style.transform = "translateX(-200%)"
  fwdButton.style.transform = "translateX(200%)"
  shiftBackground(3,3);
}

////navigation
function link() {
  // behave according to current mode
  if (currentMode === 'blips') {
    if (typeof showRadioAndPlay === 'function') showRadioAndPlay();
    try { if (typeof startplayer === 'function') startplayer(); } catch (e) { console.warn('startplayer() error', e); }
    return;
  }
  if (address) location.href = address;
}

////index
var oldIndex = 0;

function hoverNav(index){
  var tXY = (index - oldIndex)*2;
  shiftBackground(0, tXY);
  oldIndex = index;
}

////////items
function blips() {
  forwards();
  titleBox.innerHTML = "<h3>music</h3>";
  // show description of music collection and add a big listen button
  textBox.innerHTML = '<p>this is my collection of bleeps, bloops, songs, and everything sound i make and like in a small radio. click below to tune into a continuous mix.</p>' +
    '<div style="margin-top:1rem;"><button id="open-radio" style="font-size:1rem;padding:0.8rem 1rem;border-radius:6px;background:#222;color:#fff;border:0;cursor:pointer;">Listen to the Replyboy Radio</button></div>';
  // Forward button becomes a play icon and will start the radio
  currentMode = 'blips';
  address = null;
  if (fwdButton) {
    fwdButton.style.backgroundImage = 'url("/player/images/play.png")';
    fwdButton.style.backgroundSize = 'contain';
    fwdButton.style.backgroundRepeat = 'no-repeat';
    fwdButton.style.backgroundPosition = 'center';
    fwdButton.style.backgroundColor = 'transparent';
  }
}

function blops() {
  // redirect to the about page
  location.href = 'about.html';
}

function showLinks() {
  forwards();
  titleBox.innerHTML = "<h3>links</h3>";
  textBox.innerHTML = `
    <ul class="links-list">
      <li><a href="https://arvod.bandcamp.com/" target="_blank" rel="noopener">bandcamp</a></li>
      <li><a href="https://soundcloud.com/arvodes" target="_blank" rel="noopener">soundcloud</a></li>
      <li><a href="https://www.instagram.com/arvo.ds" target="_blank" rel="noopener">instagram</a></li>
      <li><a href="mailto:arvomubiz@gmail.com">email</a></li>
    </ul>
  `;
  // Forward button should navigate to the last link shown in the container
  currentMode = 'links';
  // restore forward button appearance (arrow)
  if (fwdButton) {
    fwdButton.style.backgroundImage = 'url("/images/right_w.png")';
    fwdButton.style.backgroundSize = 'cover';
    fwdButton.style.backgroundRepeat = '';
    fwdButton.style.backgroundColor = '';
  }
    const lastLink = document.querySelector('#content .links-list li:last-child a');
    // double the font-size of the links list
    const linksEl = document.querySelector('#content .links-list');
    if (linksEl) {
      // base size in CSS is 1.6rem; double it to 3.2rem
      linksEl.style.fontSize = '3.2rem';
    }
  address = lastLink ? lastLink.href : null;
}

function about() {
  forwards();
  titleBox.innerHTML = "<h3>about</h3>";
  textBox.innerHTML = "<p>this is where i talk about me myself and i</p>";
  currentMode = null;
  address = "about.html";
}
  

//rest
// Expose functions to global scope immediately
window.startPage = startPage;
window.blips = blips;
window.blops = blops;
window.showLinks = showLinks;
window.about = about;
window.hoverNav = hoverNav;
window.back = back;
window.link = link;

document.addEventListener("DOMContentLoaded", function() {
  initDOM();
  startPage();
});

// Show player iframe and start playback when user clicks the listen button
function showRadioAndPlay() {
  const frame = document.getElementById('player-frame');
  if (!frame) return;
  frame.style.display = 'block';

  // Try to access audio inside the iframe; if not yet loaded, wait for load
  try {
    const doc = frame.contentDocument || (frame.contentWindow && frame.contentWindow.document);
    const audio = doc && doc.getElementById('audio-element');
    if (audio) {
      audio.play().catch((e) => console.warn('Playback prevented:', e));
    } else {
      frame.addEventListener('load', function() {
        try {
          const a = frame.contentDocument.getElementById('audio-element');
          if (a) a.play().catch((e) => console.warn('Playback prevented after load:', e));
        } catch (e) {
          console.warn('Error accessing audio after iframe load', e);
        }
      }, { once: true });
    }
  } catch (e) {
    // Cross-origin or other access error
    console.warn('Unable to access iframe audio directly', e);
  }
}

// Delegate click handler for dynamic button
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'open-radio') {
    showRadioAndPlay();
  }
});
