//variables
var shiftX = 0;
var shiftY = 0;

var list = document.getElementById("list");
var logo = document.getElementById("logo");

const background = document.getElementById("background");
const navItems = Array.from(list.children);
const backButton = document.getElementById("back");
const fwdButton = document.getElementById("fwd");

var address;

//variable textbox
const container = document.getElementById("container");
const titleBox = document.getElementById("title");
const textBox = document.getElementById("content");

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
  textBox.innerHTML = "<p>this is my collection of bleeps, bloops, songs, and everything sound i make and like in a small radio</p>";
  address = "music";
}

function about() {
  forwards();
  titleBox.innerHTML = "<h3>about</h3>";
  textBox.innerHTML = "<p>this is where i talk about me myself and i</p>";
  address = "about";
}
  

//rest
startPage();
