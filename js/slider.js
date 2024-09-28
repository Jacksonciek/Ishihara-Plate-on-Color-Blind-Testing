var margin = 0;

window.onload = function(){
	document.getElementsByClassName("box")[0].setAttribute("id","active");
}

function control(){
		$("#slideContainer").addClass("translate");
	if(margin > -400) margin = margin - 100;
	else margin = 0;
	if(margin == "-100"){
		document.getElementsByClassName("box")[0].removeAttribute("id","active");
		document.getElementsByClassName("box")[1].setAttribute("id","active");
	}
	else if(margin == "-200"){
		document.getElementsByClassName("box")[1].removeAttribute("id","active");
		document.getElementsByClassName("box")[2].setAttribute("id","active");
	}
	else if(margin == "-300"){
		document.getElementsByClassName("box")[2].removeAttribute("id","active");
		document.getElementsByClassName("box")[3].setAttribute("id","active");
	}
	else if(margin == "-400"){
		document.getElementsByClassName("box")[3].removeAttribute("id","active");
		document.getElementsByClassName("box")[4].setAttribute("id","active");
	}
	else if(margin == "0"){
		document.getElementsByClassName("box")[4].removeAttribute("id","active");
		document.getElementsByClassName("box")[0].setAttribute("id","active");
	}
	str = margin.toString() + "%";
	document.getElementById("slideContainer").style.marginLeft = str;
}

timeOut = setInterval("control()",3000);