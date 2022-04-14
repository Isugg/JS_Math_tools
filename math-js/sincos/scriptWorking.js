//This is setting up the canvas
const canvas = document.getElementById("canvas");
const width = canvas.width; // = window.innerWidth;
const height = canvas.height; // = window.innerHeight;
const ctx = canvas.getContext('2d');

//I put all my variables at the top. Idk why.
//buttons
var circleBtn = document.getElementById("crclBtn");
var xBtn = document.getElementById("xBtn");
var yBtn = document.getElementById("yBtn");
var trailBtn = document.getElementById("trailBtn");
var sync = document.getElementById("sync");

//variables to ctrl drawing
var radius = 100;
var drawCircle = false;
var drawX = false;
var drawY = false;
var drawTrail = false;
var trail = [];

//Adding listeners to my buttons
circleBtn.addEventListener("click", function(){
  if(drawCircle){
    drawCircle = false;
  }
  else{
    drawCircle = true;
  }
})

xBtn.addEventListener("click", function(){
  if(drawX){
    drawX = false;
  }
  else{
    drawX = true;
  }
})

yBtn.addEventListener("click", function(){
  if(drawY){
    drawY = false;
  }
  else{
    drawY = true;
  }
})

trailBtn.addEventListener("click", function(){
  if(drawTrail){
    drawTrail = false;
  }
  else{
    drawTrail = true;
  }
})

sync.addEventListener("click", function(){

  marker.x = marker.y = marker.ctrlX = marker.ctrlY = markerX.ctrlX = markerX.ctrlY = markerY.ctrlX = markerY.ctrlY = 0;

  markerX.x = markerY.x = width/2;
  markerX.y = markerY.y = height/2;
})

//Start of OOP javascript. This sets up each little dot. It has an x and y, change in x and y, color, 2 control variables, and a size.
function Marker(x,y,dx,dy,color, ctrlX, ctrlY, sizeOfMarker){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.ctrlX = ctrlX;
  this.ctrlY = ctrlY;
  this.sizeOfMarker = sizeOfMarker;
}

//Just draws a circle
Marker.prototype.drawMarker = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.sizeOfMarker, 0, 2 * Math.PI);
  ctx.fill();

}

//This is necessary to use instead of calling updateX and updateY.
//Otherwise the circle will be slightly shifted because of the delay
//in the animation player.
Marker.prototype.markerUpdate = function () {
  this.x = width/2 + Math.cos(this.ctrlX +=this.dx) *radius;
  this.y = height/2 + Math.sin(this.ctrlY += this.dy) * radius;
};

//Only updates the x position and oscillates between -radius and radius
Marker.prototype.markerUpdateX = function(){
  this.x = width/2 + Math.cos(this.ctrlX+=this.dx) * radius;
}

//Only updates the y position and oscillates between -radius and radius
Marker.prototype.markerUpdateY = function(){
  this.y = height/2 + Math.sin(this.ctrlX+=this.dx) * radius;
}

//Basically markerUpdateY expanded out against the x axis. It stores itself in an array to be rendered later.
Marker.prototype.updateSin = function(){
  if(this.x < width){
    this.y = height/2 + Math.sin(this.ctrlY+=this.dy) * radius;
    this.x += 1;
    let markerTemp = new Marker(this.x, this.y, 0, 0, this.color, this.ctrlX, this.ctrlY, this.sizeOfMarker);
    trail.push(markerTemp);
  }
}

//Basically markerUpdateX expanded out against the y axis. It stores itself in an array to be rendered later.
Marker.prototype.updateCos = function(){
  if(this.y > 0){
    this.x = width/2 + Math.cos(this.ctrlX+=this.dx) * radius;
    this.y -= 1;
    let markerTemp = new Marker(this.x, this.y, 0, 0, this.color, this.ctrlX, this.ctrlY, this.sizeOfMarker);
    trail.push(markerTemp);
  }
}

//Setup a bunch of new markers to represent x pos, y pos, circle, sine, and cosine
let marker = new Marker(width/2, height/2, .1, .1, "#0a2ead", 0, 0, 8);
let markerX = new Marker(width/2, height/2, .1, .1, "#f5bc00", 0, 0, 8);
let markerY = new Marker(width/2, height/2, .1, .1, "#f5bc00", 0, 0, 8);
let markerSin = new Marker(width/2, height/2, .05, .05, "#d10a6a", 0, 0, 2);
let markerCos = new Marker(width/2, height/2, .05, .05, "#3e07ab", 0, 0, 2);

//Never renamed this function. I was testing things.
function test(){

  //clears the animation windows every frame
  ctx.fillStyle = "#090f24";
  ctx.fillRect(0,0,width,height);

  //draw and update markers if they're selected
  if(drawCircle){
    marker.drawMarker();
    marker.markerUpdate();
  }
  if(drawX){
    markerX.drawMarker();
    markerX.markerUpdateX();
  }

  if(drawY){
    markerY.drawMarker();
    markerY.markerUpdateY();
  }

//Ok hommie, we need to render all past versions of the marker because it gets wiped every frame.
//So we store thos objects in an array and render that. There are various catches to stop from
//storing an infinite amount of markers.
  if(drawTrail){
    for (var i = 0; i < trail.length; i++) {
      if(typeof trail[i] !== 'undefined'){
        trail[i].drawMarker();
      }
    }
    markerSin.updateSin();
    markerCos.updateCos();
  }
  //replay this method every frame
  window.requestAnimationFrame(test);
}

//set new canvas and make sure test gets ran at least once
ctx.fillStyle = "#090f24";
ctx.fillRect(0,0,width,height);
test();
