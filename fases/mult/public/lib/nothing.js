/*
* Loading
* @Autor Cristiano Boell
*/
var fade = document.getElementById("fade");
var bar = document.getElementById("loading_bar_white");
var gamex = document.getElementById("gamex");
var body  = document.getElementsByTagName("body")[0];
var progress = 1;
var loading;
var x = 32;
var y = 80;
// Fade In
function fadeIn(){
	fade.setAttribute("closed",false);
	bar.style.display = "none";
	gamex.style.display = "block";
	body.style.background = "#ffffff";
	setTimeout(function(){
		fade.style.display = "none";
	},1000);
}
// Load Ready
 onProgress = function(progress){
	if(progress==1) {
		//
  }
	bar.style.width = progress+"%";
	if(progress==100){
			fadeIn();
			main();
	}
 };
 //	This callback is sent the following parameters:
 function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
	// console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
 	onProgress(progress);
 	var newImage = game.add.image(x, y, cacheKey);
 	newImage.scale.set(0.3);
 	x += newImage.width + 20;
 	if (x > 700)
 	{
 		x = 32;
 		y += 332;
 	}
 }
 function loadComplete() {
 	 //console.log("Load Complete");
 }
 function loadStart() {
 	 //console.log("Loading ...");
 }
 var myVar = setInterval(function(){
        if(typeof Phryan === 'object'){
            clearInterval(myVar);
            onProgress(1);
        }else{
           //console.log('loading..');
        }
  }, 500);
