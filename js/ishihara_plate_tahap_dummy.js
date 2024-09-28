var highlight_const_h = Math.random()*148;
var normal_const_h = Math.random()*22;
var highlight_const_s = Math.random()*1.0;
var normal_const_s = Math.random()*1.0;
var highlight_const_v = 0.5+Math.random()*0.7;
var normal_const_v = 0.5+Math.random()*0.7;
var highlight_second_const_s = Math.random()*1.0;
var highlight_second_const_v = 0.5+Math.random()*0.7;
var circle_radius = 440;
var n;
var dots = [];
var n_points = 0;
var radius = 7.5;
var color1,color2,color3;
var startTime;
function hsv_to_rgb(H, S, V) {
    var C = V * S;
    var H1 = H / 60;
    var X = C * (1 - Math.abs(H1 % 2 - 1));
    if (0<=H1 && H1<1)
        RGB1 = [C, X, 0];
    else if (1<=H1 && H1<2)
        RGB1 = [X, C, 0];
    else if (2<=H1 && H1<3)
        RGB1 = [0, C, X];
    else if (3<=H1 && H1<4)
        RGB1 = [0, X, C];
    else if (4<=H1 && H1<5)
        RGB1 = [X, 0, C];
    else if (5<=H1 && H1<6)
        RGB1 = [C, 0, X];
    else
        RGB1 = [0, 0, 0];
    var m = V - C;
    return [Math.floor((RGB1[0] + m) * 256), Math.floor((RGB1[1] + m) * 256), Math.floor((RGB1[2] + m) * 256)];
}
function check_point(x,y){
	var isInside=Math.pow(220 - x, 2) + Math.pow(220 - y, 2) <= 200*200;
	return isInside;
}

var ctx;
var str;

function flood_fill(x,y,dots){
	dots[x][y][6] = 1;
	
	if((x >=50 || x < 0) || (y >=50 || y < 0)) return;
	if(dots[x][y][5] == false){
		if(x+1 < 50 && dots[x+1][y][6] == 2)flood_fill(x+1,y,dots);
		if(y+1 < 50 && dots[x][y+1][6] == 2)flood_fill(x,y+1,dots);
		if(x-1 >= 0 && dots[x-1][y][6] == 2)flood_fill(x-1,y,dots);
		if(y-1 >= 0 && dots[x][y-1][6] == 2)flood_fill(x,y-1,dots);
	};
	var uu = 0.2;
	highlight_const_s = uu + Math.random()*(1.0-uu);
	normal_const_s = uu + Math.random()*(1.0-uu);
	highlight_const_v = uu + Math.random()*(1.0-uu);
	normal_const_v = uu + Math.random()*(1.0-uu);
	highlight_second_const_s = uu + Math.random()*(1.0-uu);
	highlight_second_const_v = uu + Math.random()*(1.0-uu);
	highlight = ctx.getImageData(dots[x][y][0] , dots[x][y][1] , 1, 1).data;
	//console.log(highlight[0] + " " + highlight[1] + " " + highlight[2]);
	
	if(highlight[1] != 0 && highlight[0] == 0 && highlight[2] == 0 ){
		
		color = hsv_to_rgb(color3,highlight_second_const_s, highlight_second_const_v);
		dots[x][y][4] = color;
		
	}
	else if (highlight[0] != 255 &&  highlight[1] != 255 && highlight[2] != 255){
		color = hsv_to_rgb(color1,highlight_const_s, highlight_const_v);
		dots[x][y][4] = color;
	
	}
	else{
		color = hsv_to_rgb(color2, normal_const_s, normal_const_v);
		dots[x][y][4] = color;
	}
	if(x+1 < 50 && dots[x+1][y][6] == 2) flood_fill(x+1,y,dots);
	if(y+1 < 50 && dots[x][y+1][6] == 2)flood_fill(x,y+1,dots);
	if(x-1 >= 0 && dots[x-1][y][6] == 2)flood_fill(x-1,y,dots);
	if(y-1 >= 0 && dots[x][y-1][6] == 2)flood_fill(x,y-1,dots);
	
	
}
function second_flood_fill(x,y,dots){
	

	if(x+1 < 50 && dots[x+1][y][6] == 1) second_flood_fill(x+1,y,dots);
	if(y+1 < 50 && dots[x][y+1][6] == 1)second_flood_fill(x,y+1,dots);
	if(x-1 >= 0 && dots[x-1][y][6] == 1)second_flood_fill(x-1,y,dots);
	if(y-1 >= 0 && dots[x][y-1][6] == 1)second_flood_fill(x,y-1,dots);
}

function init(){
	x = y = 0;
	for(var i = 0; i < 50;i++){
		dots[i] = [];
		for(var j = 0; j < 50;j++){
			var visible = true;
			if(check_point(x,y) == false) visible = false; 
			x = x + radius*2 + 2;
			color  = hsv_to_rgb(0,0,0);
			dots[i].push([x, y, radius, false, color,visible,2,false]);
			n_points++;
		}
		x = 0;
		y = y+radius*2;		
	}
}
function ishi_buat(a,b,c,numb,ind) {
	startTime = new Date().getTime();

	str = '';
	var canvas = document.getElementById('STAGE');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 500, 500);
	
    ctx.font = 'italic bold 280px "Comic Sans MS"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
	
	highlight_const_s = Math.random()*1.0;
	normal_const_s = Math.random()*1.0;
	highlight_const_v = Math.random()*1.0;
	normal_const_v = Math.random()*1.0;
	color1 = a;
	color2 = b;
	color3 = c;
	var res_x,res_y;
	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		// At least Safari 3+: "[object HTMLElementConstructor]"
	var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
	var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
	if(isChrome ){
		res_x = 120;
		res_y = 200;
	}
	else {
		res_x = 150;
		res_y = 220;
	
	}
	if(ind == 1){		
		ctx.fillText((Math.floor(numb/10)).toString(), res_x, res_y);
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "#00FF00";
		ctx.fillText((numb%10).toString(), res_x+170, res_y);
		flood_fill(25,25,dots);
		ishi_draw(dots);
	}
	else if(ind == 2){
		var img = new Image();
		img.onload = function(){
			ctx.drawImage(img,0,0, 500, 500);
			
			flood_fill(25,25,dots);
			
			ishi_draw(dots);
	
		}
		img.src ='/picture/' + numb +'.jpg';
		image.crossOrigin="anonymous";
	}
	else{
		ctx.fillText(numb,180,200);
		flood_fill(25,25,dots);
		
		ishi_draw(dots);
	}
	
	return numb;
}

function ishi_draw(dots, highlight) {
    var canvas = document.getElementById('STAGE');
    canvas.width = canvas.width;
    ctx = canvas.getContext('2d');
    var radius = 200;
    for (var i=0; i<dots.length; i++) {
        for(var j=0; j <dots[i].length;j++){
			
			if(dots[i][j][5] == true) {
				
				var dot = dots[i][j];
				var color = dot[4];
				ctx.globalAlpha = 1.0;
				ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
				ctx.beginPath();
				ctx.arc(dot[0] , dot[1], dot[2], 0, 2 * Math.PI, false);
				ctx.closePath();
				ctx.fill();
			}
			dots[i][j][6] = 2;
		}
    }
//	console.log(new Date().getTime() - startTime);
		
}
init();