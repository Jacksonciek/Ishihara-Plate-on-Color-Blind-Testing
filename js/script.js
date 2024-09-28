function getsize(){
	var wind = $(window).width();
	if(wind >= 1024)return "Desktop";
	else return "Mobile";
};

var wind = getsize();
if(wind == "Desktop"){
	$(".content").css("width","700px");
	$(".paging").css("margin-left","300px");
	$(".title").css("font-size","2.5vw");
	$(".detailTitle").css("font-size","3.0vw");
	$(".duration").css("font-size","2.5vw");
	$(".play").css("font-size","2.5vw");
	$(".detail").css("font-size","2.5vw");
}
else{
	$(".content").css("width","100%");
	$(".paging").css("margin-left","44.0vw");
	$(".title").css("font-size","4.5vw");
	$(".detailTitle").css("font-size","5.5vw");
	$(".duration").css("font-size","5.0vw");
	$(".play").css("font-size","4.5vw");
	$(".detail").css("font-size","4.5vw");
}

$(window).resize(function () {
	var wind = getsize();
	if(wind == "Desktop"){
		$(".content").css("width","700px");
		$(".paging").css("margin-left","300px");
		$(".title").css("font-size","2.5vw");
		$(".detailTitle").css("font-size","3.0vw");
		$(".duration").css("font-size","2.5vw");
		$(".play").css("font-size","2.5vw");
		$(".detail").css("font-size","2.5vw");
	}
	else{
		$(".content").css("width","100%");
		$(".paging").css("margin-left","44.0vw");
		$(".title").css("font-size","4.5vw");
		$(".detailTitle").css("font-size","5.5vw");
		$(".duration").css("font-size","5.0vw");
		$(".play").css("font-size","4.5vw");
		$(".detail").css("font-size","4.5vw");
	}
});