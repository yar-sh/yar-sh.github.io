


//display totop button
window.onscroll = function () { 
 if (window.pageYOffset > 120) {
  toTop.style.display = 'block'; 
 } else {
  toTop.style.display = 'none';
 }
};

//makes menu transparent
$(window).scroll(function() {
 if(window.pageYOffset > 50) {
  document.getElementById("mainMenu").classList.add("w3-opacity");
 } else {
  document.getElementById("mainMenu").classList.remove("w3-opacity");
 }
});

function resizeLogoOffset() {
  document.getElementById("logo").style.marginTop = $( "#mainMenu" ).height()+ "px";
};

//on every resize recalculates menu offset for header displacement
$(document).ready(function(){
    $(window).resize(function(){
      resizeLogoOffset()
    });
  });


//Toggles the menu on smaller screens when clicking on the menu button
function openNav() {
 var x = document.getElementById("navSmall");
 var y = document.getElementById("navSymbol");
 var z = document.getElementById("navBox");

 //show small menu
 if (x.className.indexOf("w3-show") == -1) {
  x.className += " w3-show";
  y.className = "fa fa-times";
  z.className +=" w3-border-green";
  z.className +=" w3-light-green";
  //keeps content on the same place
  parent.document.body.scrollTop = parent.document.body.scrollTop+ $( "#mainMenu" ).height() - 49;
  parent.document.documentElement.scrollTop = parent.document.documentElement.scrollTop + $( "#mainMenu" ).height() - 49;
 } else {//hide small menu
  x.className = x.className.replace(" w3-show", "");
  y.className = "fa fa-bars";
  z.className = "w3-hover-light-green w3-large topMenu w3-padding w3-bottombar";
  //keeps content on the same place
  parent.document.body.scrollTop = parent.document.body.scrollTop- $( "#mainMenu" ).height()*4;
  parent.document.documentElement.scrollTop = parent.document.documentElement.scrollTop - $( "#mainMenu" ).height()*4;
 
 }

 resizeLogoOffset();
 //recreate element, for animation to play again
 var newY = y.cloneNode(true);
 y.parentNode.replaceChild(newY, y);
}

//opens url in a new tab
function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
}

