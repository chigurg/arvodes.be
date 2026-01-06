var bol = document.getElementById("bol");
var scrollDistance
var element = document.getElementById("scroll-length")
var menuBtn = document.querySelector('h3');

window.addEventListener('scroll', function() {
  scroll =  (window.pageYOffset - 400) * 3 + "px";
  bol.style.height = scroll;
  bol.style.width = scroll;
  bol.style.borderRadius = scroll;

  element.innerHTML = window.pageYOffset + "px";  
  // show/hide MENU button based on scroll position
  if (menuBtn) {
    if (window.pageYOffset >= 100) {
      menuBtn.classList.add('visible');
    } else {
      menuBtn.classList.remove('visible');
    }
  }
});

var stickyImage = document.getElementsByClassName("sticky");
var nav = document.getElementById("nav");
var list = document.getElementById("list");
var liArray = Array.from(list.querySelectorAll("li"));


var menuOn = true;
function menu() {
  if (window.pageYOffset < 100) {
    return; // Don't open menu if scroll position is less than 100px
  }
  
  if (menuOn === true) {
    menuOn = false;
    stickyImage[0].style.opacity = 0;
    nav.classList.add('open');
    list.style.opacity = 1;
    
    for (let index = 0; index < liArray.length ; index++) {
      liArray[index].style.transform = "scaleY(1)";
      liArray[index].style.transitionDelay = (index*100)+ 200 + "ms";
    }
    
  } else if (menuOn === false) {
      menuOn = true;
    stickyImage[0].style.opacity = 1;
    nav.classList.remove('open');
    list.style.opacity = 0;
    
    for (let index = 0; index < liArray.length ; index++) {
      liArray[index].style.transform = "scaleY(0)";
      liArray[index].style.transitionDelay = 0 + "ms";
    }
  }
}