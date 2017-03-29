$(document).on("ready", function() {
	GetPageContents(window.location.hash.substr(1), function() {
		DrawPageElements(true);
	});

	$(window).on("scroll", function() {
		ChangeMenuOpacity();
	});
});

$(window).on("resize", function() { 
	DrawPageElements(false);
	ChangeMenuOpacity();
});	

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

function GetPageContents(page, callback)
{
	if(!Boolean(page))
		page = "home";

	$.ajax({
	  type: "GET",
	  url: "mainPages/" + page + ".html",
	  success: function(data){
	    $("#contentPane").html(data);
			callback();
	  },
	  error: function() {
	    $.get("404.html", function(data) {
	    	$("#contentPane").html(data);
	    	callback();
	    });
	  }
	});
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
		}
	}
}