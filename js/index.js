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
  location.href = address + '.html';
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
  // embed the existing radio player in the content area
  textBox.innerHTML = '<p>this is my collection of bleeps, bloops, songs, and everything sound i make and like in a small radio</p>' +
    '<div style="margin-top:1rem;"><iframe src="/player/radio.html" style="border:0;width:100%;height:180px;max-width:420px;" title="radio-player"></iframe></div>';
  address = null;
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
  address = null;
}

function about() {
  forwards();
  titleBox.innerHTML = "<h3>about</h3>";
  textBox.innerHTML = "<p>this is where i talk about me myself and i</p>";
  address = "about";
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
