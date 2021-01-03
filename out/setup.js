"use strict";
const gameArea = document.getElementById('game-area');
var width;
var height;
var columns;
var rows;
var sqWidth;
var sqHeight;
var context;
//Set size using the slider
var sizeSlider = document.getElementById("size");
function setupGrid() {
    width = gameArea.offsetWidth;
    height = gameArea.offsetHeight;
    var size = +sizeSlider.value;
    //New
    //Sizing calculations
    columns = Math.floor(width / size);
    rows = Math.floor(height / size);
    sqWidth = Math.floor(width / columns);
    sqHeight = Math.floor(height / rows);
    width = columns * sqWidth;
    height = rows * sqHeight;
    gameArea.style.width = width.toString();
    gameArea.style.height = height.toString();
    //Background Layer
    var background = document.getElementById('background');
    if (!background.getContext) {
        alert('Canvas is not supported!');
    }
    var backgroundContext = background.getContext('2d');
    background.width = width;
    background.height = height;
    backgroundContext.fillStyle = 'rgb(35, 235, 8)';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let offset = 0;
            if (i % 2 == 0)
                offset = 1;
            if (((j + offset) % 2) == 0)
                backgroundContext.fillRect(sqWidth * j, sqHeight * i, sqWidth, sqHeight);
        }
    }
    //Game layer
    var canvas = document.getElementById('game');
    if (!canvas.getContext) {
        alert('Canvas is not supported!');
    }
    context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
}
setupGrid();
var speedSlider = document.getElementById("speed");
var speed;
function setSpeed() {
    speed = +speedSlider.value;
    speed = Math.abs(30 - speed);
}
setSpeed();
//Causes page to reload when window is resized
window.onresize = function () {
    location.reload();
};
// let offscreen = canvas.transferControlToOffscreen();
// canvas.offscreenCanvas = document.createElement('canvas');
// canvas.offscreenCanvas.width = canvas.width;
// canvas.offscreenCanvas.height = canvas.height;
// context.drawImage(offscreen, 0, 0);    
// console.log(width);
// console.log(height);
// console.log(sqWidth);
// console.log(sqHeight);
//Practice drawing the grid on the page
// let cur = 0;
// for (let i = 0; i <= rows; i++) {
//     context.fillRect(0, cur, width, 1);
//     cur += sqHeight;
// }
// cur = 0;
// for (let i = 0; i <= columns; i++) {
//     context.fillRect(cur, 0, 1, height);
//     cur += sqWidth;
// }
// context.fillRect(0, 0, width, 2);
// context.fillRect(0, 0, 2, height);
// context.fillRect(0, sqHeight * (rows-1), width, 2);
// context.fillRect(sqWidth* (columns-1), 0, 2, height);
//   context.fillStyle = 'blue';
//   context.fillRect(sqWidth*3, sqHeight*3, sqWidth, sqHeight);
//  context.fillRect(sqWidth*4, sqHeight*3, sqWidth, sqHeight);
//  context.fillRect(sqWidth*5, sqHeight*3, sqWidth, sqHeight);
//  context.fillRect(sqWidth*5, sqHeight*4, sqWidth, sqHeight);
//  context.fillRect(sqWidth*(columns-1), sqHeight*(rows-1), sqWidth, sqHeight);
