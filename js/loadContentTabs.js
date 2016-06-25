//stores current opened tab
opened = 'none';

//loads blocks of text on the main page and displays selected tab
function loadContent(nameOfPage, tabNumber, calledFromOtherHTML = false) {
 $(this).click(function(event) { //prevents jump to the anchor point
    event.preventDefault();
 });


 if(window.pageYOffset > 100) window.parent.$('html, body').stop().animate({scrollTop:0}, 400); //scrolls to the top

 window.parent.$("body").promise().done(function(){
  if(tabNumber != -1) {
   var tabLinks = parent.document.getElementsByClassName("tabLink");

   if(calledFromOtherHTML) parent.document.opened = 'none'; //will always redraw block of text in content

   //if new block of text is requested
   if(parent.document.opened != window.location.href.split("#")[0] + nameOfPage +'.html') {

    //while it loads - put loading symbol
    parent.document.getElementById("contentWrap").innerHTML='<p style="font-size:100px" class="w3-center"><i class="fa fa-refresh"></i></p>';

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

    //sets current opened window
    parent.document.opened = parent.window.location.href.split("#")[0] + nameOfPage +'.html';

    //loads new content
    $.get('/mainInfo/' + nameOfPage+'.html', function(data) {
     document.getElementById('contentWrap').innerHTML= data;
     $('.javascript').each(function() {
      eval($(this).text());
      });
    });
   }
  }
 });
}