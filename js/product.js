function scrollTo(toID, tabNumber) {
 if(tabNumber != -1) {
	var tabLinks = parent.document.getElementsByClassName("tabLink");
	for (i = 0; i < tabLinks.length; i++) { //make all tabs unselected
   tabLinks[i].classList.remove("w3-border-green");
   tabLinks[i].classList.remove("w3-light-green");
  }

  //make selectd tab selected
  tabLinks[tabNumber].classList.add("w3-border-green");
  tabLinks[tabNumber].classList.add("w3-light-green");

  //same for the mobile menu
  tabLinks[(tabNumber+4)].classList.add("w3-border-green");
  tabLinks[(tabNumber+4)].classList.add("w3-light-green");
 }
 event.preventDefault();
 var toPos = $("#"+toID).position().top - $( "#mainMenu" ).height();
 window.parent.$('html, body').stop().animate({scrollTop:toPos}, 400);
};