//Setting up my canvas
const canvas = document.getElementById("canvas");
const width = canvas.width; // = window.innerWidth; //enable these to fill whole screen
const height = canvas.height; // = window.innerHeight; //enable these to fill whole screen
const ctx = canvas.getContext('2d');
ctx.fillStyle = "#090f24";
ctx.fillRect(0,0,width,height);

//Setting up global var
//counter and radius control the spacing and size, hence the global nature
var isLeftSkewed;
var isRightSkewed;
var counter = 100;
var radius = 8;

//Add listeners to buttons
gaus.addEventListener("click", function(){
  isLeftSkewed = false;
  isRightSkewed = false;
  main();
})

leftSkew.addEventListener("click", function(){
  isLeftSkewed = true;
  isRightSkewed = false;
  main();
})

rightSkew.addEventListener("click", function(){
  isLeftSkewed = false;
  isRightSkewed = true;
  main();
})

//Setting up how many datapoints (dps) to render as well as controlling their size so that 500 dps won't go off screen
dp.addEventListener("click", function(){
  counter = document.getElementById("counter").value;
  if(counter > 50){
  radius = height/counter;}
  else{
    radius = 8;
  }
  main();
})

//Star of OOP in js. Ball object is poorly named. It's a data point really.
function Ball(leftSkew, rightSkew, finalPos){
  this.leftSkew = leftSkew;
  this.rightSkew = rightSkew;
  this.finalPos = finalPos;
}

//This function randomly chooses a position for the ball with varying weights.
Ball.prototype.randomize = function(){
          var sumOfWeight = 0;
          var numChoices = 8;
          var choiceWeight = [];

          if(this.leftSkew){
              choiceWeight = [23, 34, 14, 13, 8, 5, 2, 1];
          }
          else if(this.rightSkew){
              choiceWeight = [1, 2, 5, 8, 13, 14, 34, 23];
          }
          else{
              choiceWeight = [1, 2, 13, 34, 34, 13, 2, 1];
          }
//Summing up the weights. This could be replaced with sumOfWeight = 100,
// but this is better for scalability. If I want to add more skews or weights, I can.
          for(var i = 0; i<numChoices; i++){
              sumOfWeight += choiceWeight[i];
          }
//Randomly assign with different weights. This works by giving a value from 0-targetWeight and itirrating down
//until the target weight is achieved. This is because it is less likely to choose a random number between 0-1 on
//the first try, than it is to choose between 0-34 on the first try.
          var rnd = Math.random()*sumOfWeight;
          for(var i = 0; i<numChoices; i++){
              if(rnd < choiceWeight[i]){
                  this.finalPos = i;
                  return;
              }
              rnd -= choiceWeight[i];
          }
}


function main(){
//fill the canvas
  ctx.fillStyle = "#090f24";
  ctx.fillRect(0,0,width,height);

//create an empty array of balls and array of positions to fill later
var arrayOfBalls = [];
var pos = [0,0,0,0,0,0,0,0];

//fill the array of balls with how ever many dps have been selected.
for(var i=0; i<counter; i++){
  arrayOfBalls.push(new Ball(isLeftSkewed, isRightSkewed, 0));
}

//randomize the position with different weights
for(var i=0; i<arrayOfBalls.length; i++){
  arrayOfBalls[i].randomize();
}

//populate how many dps are in each position
for(var i=0; i<arrayOfBalls.length; i++){
            if(arrayOfBalls[i].finalPos == 0){
                pos[0]++;
            }
            else if(arrayOfBalls[i].finalPos == 1){
                pos[1]++;
            }
            else if(arrayOfBalls[i].finalPos == 2){
                pos[2]++;
            }
            else if(arrayOfBalls[i].finalPos == 3){
                pos[3]++;
            }
            else if(arrayOfBalls[i].finalPos == 4){
                pos[4]++;
            }
            else if(arrayOfBalls[i].finalPos == 5){
                pos[5]++;
            }
            else if(arrayOfBalls[i].finalPos == 6){
                pos[6]++;
            }
            else if(arrayOfBalls[i].finalPos == 7){
                pos[7]++;
            }
}

//draws the datapoints. Could probably be replaced with a nested for loop.
for(var i=0; i<pos[0]; i++){
  ctx.beginPath();
  ctx.fillStyle = "#e00052";
  ctx.arc(canvas.width/2 + 150, i*-radius*2 + canvas.height-radius, radius, 0, 2 * Math.PI);
  ctx.fill();
}

for(var i=0; i<pos[1]; i++){
  ctx.beginPath();
  ctx.fillStyle = "#e00052";
  ctx.arc(canvas.width/2 + 100, i*-radius*2 + canvas.height-radius, radius, 0, 2 * Math.PI);
  ctx.fill();
}

for(var i=0; i<pos[2]; i++){
  ctx.beginPath();
  ctx.fillStyle = "#e00052";
  ctx.arc(canvas.width/2 + 50, i*-radius*2 + canvas.height-radius, radius, 0, 2 * Math.PI);
  ctx.fill();
}

 for(var i=0; i<pos[3]; i++){
   ctx.beginPath();
   ctx.fillStyle = "#e00052";
   ctx.arc(canvas.width/2, i*-radius*2 + canvas.height-radius, radius, 0, 2 * Math.PI);
   ctx.fill();
 }

 for(var i=0; i<pos[4]; i++){
   ctx.beginPath();
   ctx.fillStyle = "#e00052";
   ctx.arc(canvas.width/2-50, i*-radius*2 + canvas.height-radius, radius, 0, 2 * Math.PI);
   ctx.fill();
 }

 for(var i=0; i<pos[5]; i++){
   ctx.beginPath();
   ctx.fillStyle = "#e00052";
   ctx.arc(canvas.width/2-100, i*-radius*2 + canvas.height-radius, radius, 0, 2 * Math.PI);
   ctx.fill();
 }

 for(var i=0; i<pos[6]; i++){
   ctx.beginPath();
   ctx.fillStyle = "#e00052";
   ctx.arc(canvas.width/2-150, i*-radius*2 + canvas.height-radius, radius, 0, 2 * Math.PI);
   ctx.fill();
 }

 for(var i=0; i<pos[7]; i++){
   ctx.beginPath();
   ctx.fillStyle = "#e00052";
   ctx.arc(canvas.width/2-200, i*-radius*2 + canvas.height-radius, radius, 0, 2 * Math.PI);
   ctx.fill();
 }
//logging the specifics of the datapoints
console.log(pos[0]);
console.log(pos[1]);
console.log(pos[2]);
console.log(pos[3]);
console.log(pos[4]);
console.log(pos[5]);
console.log(pos[6]);
console.log(pos[7]);
}

main();
