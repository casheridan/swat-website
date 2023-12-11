var slideIndex = 1;
var currentTimeoutId = "none";
var paused = false;

showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
  pauseCarousel();
}

function showDivs(n) {
  stopCarousel();
  var i;
  var x = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dots");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-red", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-red";
  startCarousel();
}

function carousel(){
    plusDivs(1);
}

function stopCarousel(){
  if (typeof this.currentTimeoutId === "number") {
    clearTimeout(this.currentTimeoutId)
    this.currentTimeoutId = "none";
  }
}

function startCarousel(){
  currentTimeoutId= setTimeout(carousel, 10000);
}

function togglePauseCarousel(){
  if(this.paused){
    unPauseCarousel();
  }
  else{
    pauseCarousel();
  }
}

function pauseCarousel(){
  stopCarousel();
  var pauseButtons = document.getElementsByClassName("pausebutton");
  for (i = 0; i < pauseButtons.length; i++) {
    
    pauseButtons[i].innerHTML = "⏵︎";
  }
  this.paused = true;
}

function unPauseCarousel(){
  startCarousel();
  var pauseButtons = document.getElementsByClassName("pausebutton");
  for (i = 0; i < pauseButtons.length; i++) {
    pauseButtons[i].innerHTML = "⏸︎";
  }
  this.paused = false;
}