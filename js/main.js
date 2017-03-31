window.nOfProjects = 3;
$(document).on("ready", function() {
	GetPageContents(window.location);

	$("#toTop").click(function() {
		SmoothScrollTo(0,250);
	});
});

$(window).on("scroll", function() {
	ChangeMenuOpacity();
	ChangeToTopOpacity();
});


$(window).on("resize", function() { 
	DrawPageElements(false);
	ChangeMenuOpacity(); 
	ChangeToTopOpacity();
});	

function ChangeToTopOpacity()
{
	if(window.isMobile)
	{
		if($(window).scrollTop() >= $("div#menuPane").height() && $("#toTop").hasClass("hide"))
			$("#toTop").removeClass("hide");
		else if($(window).scrollTop() < $("div#menuPane").height() && !$("#toTop").hasClass("hide"))
			$("#toTop").addClass("hide");
	}
	else
	{
		if($(window).scrollTop() >= $("#pageTitle").height() && $("#toTop").hasClass("hide"))
			$("#toTop").removeClass("hide");
		else if($(window).scrollTop() < $("#pageTitle").height() && !$("#toTop").hasClass("hide"))
			$("#toTop").addClass("hide");
	}
}

function ChangeMenuOpacity()
{
	if(window.isMobile)
	{
		if($(window).scrollTop() >= $("div#menuElement").height() && !$("div#menuPane").hasClass("opacityMenu"))
			$("div#menuPane").addClass("opacityMenu");
		else if($(window).scrollTop() < $("div#menuElement").height() && $("div#menuPane").hasClass("opacityMenu"))
			$("div#menuPane").removeClass("opacityMenu");
	}
	else if($("div#menuPane").hasClass("opacityMenu"))
		$("div#menuPane").removeClass("opacityMenu");
}

function GetPageContents(folder)
{
	folder = folder.hash.substr(1);

	if(window.location.hash.substr(1) === folder && (Boolean(folder) || folder === "home") && Boolean($("div#contentPane").html()))
		return;

	$("div#menuElement").removeClass("selectedMenuElement");

	if(!Boolean(folder))
	{
		$("a[href$=\"#home\"] div").addClass("selectedMenuElement");
		folder = "home";
	}
	else
		$("a[href$=\"#" + folder + "\"] div").addClass("selectedMenuElement");

	$.ajax({
	  type: "GET",
	  url: "0_" + folder + "/index.html",
	  success: function(data){
	    $("#contentPane").html(data);
			DrawPageElements(true);
	  },
	  error: function() {
	    $.get("404.html", function(data) {
	    	$("#contentPane").html(data);
				DrawPageElements(true);
	    });
	  }
	});

	window.scrollTo(0,0);
}

function DrawPageElements(forceRecheck)
{	
	if(forceRecheck)
	{
		if($(window).width() >= $(window).height())
			window.isMobile = !false;
		else
			window.isMobile = !true;
	}

	if((window.isMobile && $(window).width() >= $(window).height()) ||
		 (!window.isMobile && $(window).width() < $(window).height()))
	{
		window.isMobile = !window.isMobile;
		if(!isMobile)
		{
			$("div#menuPane").removeClass("menuPaneM").addClass("menuPaneD");
			$("div#menuElement").removeClass("menuElementM").addClass("menuElementD");
			$("div#menuElement").css({"width": "95%"});
			$("div#menuElement").css({"height": "calc(100vh / " + $("div#menuElement").length + ")"});

			$(".menuShortTitle").css({"font-size": "calc(12px + 100vmin / " + $("div#menuElement").length + " / 7)"});
			$(".menuLongTitle").css({"font-size": "calc(8px + 100vmin / " + $("div#menuElement").length + " / 14)"});
			$(".menuLongTitle").show();

			$("div#contentPane").removeClass("contentPaneM").addClass("contentPaneD");
			$("div#pageTitle").removeClass("pageTitleM").addClass("pageTitleD");
			$("div#pageSubTitle").removeClass("pageSubTitleM").addClass("pageSubTitleD");

			$("div#projectCard").removeClass("projectCardM").addClass("projectCardD");
		}
		else
		{
			$("div#menuPane").removeClass("menuPaneD").addClass("menuPaneM");
			$("div#menuElement").removeClass("menuElementD").addClass("menuElementM");
			$("div#menuElement").css({"width": "calc(100% / " + $("div#menuElement").length + ")"});
			$("div#menuElement").css({"height": "8vh"});

			$(".menuShortTitle").css({"font-size": "calc(12px + 100vmin / " + $("div#menuElement").length + " / 14)"});
			$(".menuLongTitle").hide();

			$("div#contentPane").removeClass("contentPaneD").addClass("contentPaneM");
			$("div#pageTitle").removeClass("pageTitleD").addClass("pageTitleM");
			$("div#pageSubTitle").removeClass("pageSubTitleD").addClass("pageSubTitleM");

			$("div#projectCard").removeClass("projectCardD").addClass("projectCardM");
		}
	}
}

function SmoothScrollTo(to, duration) {
  if (duration < 0) {
      return;
  }
  var difference = to - $(window).scrollTop();
  var perTick = difference / duration * 10;
  this.scrollToTimerCache = setTimeout(function() {
      if (!isNaN(parseInt(perTick, 10))) {
          window.scrollTo(0, $(window).scrollTop() + perTick);
          SmoothScrollTo(to, duration - 10);
      }
  }.bind(this), 10);
}