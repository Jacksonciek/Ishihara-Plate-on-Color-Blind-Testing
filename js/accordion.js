function run(){
		
		var abc = document.getElementsByClassName("video");
		var i = abc.length;
		
		while(i--){
			
			if(abc[i].style.maxHeight != "0px" ){
				abc[i].style.maxHeight = "0px";
				document.getElementById("lower_bar").style.visibility = "hidden";
			}
			else{
				abc[i].style.maxHeight = (400).toString() + "px";
				abc[i].classList.add("translate");
				abc[i].style.height = "400px";
				abc[i].style.width = "91%";
				document.getElementById("lower_bar").style.visibility = "visible";
				abc[i].style.margin = "auto";
			}
			
			
		}
		
}

