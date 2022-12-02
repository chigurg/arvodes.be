//hiiii this is the js one
document.documentElement.classList.add('preparation')
window.onload = function() {
  document.documentElement.classList.remove('preparation');
};


let wave = document.querySelector(".wave").innerHTML;

var waveArray = wave.split("");

for (let i = 0; i < waveArray.length; i++) {
  var t = i*30;
  var c = 1;
  if (i > 0) {c = Math.floor(i*(360/waveArray.length));
  } else {
    c = 0;}
  
  waveArray[i] = '<p class="wave" style="color: hsl('+ c + ', 100%, 50%); animation: wave 1s linear infinite; animation-delay:' + -t + 'ms;">' + waveArray[i] + '</p>';}

var waveString = waveArray.join(" ");

document.querySelector(".wave").innerHTML = waveString;

