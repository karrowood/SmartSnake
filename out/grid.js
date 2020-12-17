"use strict";
const gameArea = document.getElementById('game-area');
var width = gameArea.offsetWidth;
var height = gameArea.offsetHeight;
console.log(width);
console.log(height);
//Size 1 (20x20 px)
const size = 20;
//size 2 (15x15 px)
//const size = 15;
//size 3 (10x10 px)
//const size = 10;
const columns = Math.floor(width / size);
const rows = Math.floor(height / size);
const sqWidth = Math.floor(width / columns);
const sqHeight = Math.floor(height / rows);
width = columns * size;
height = rows * size;
gameArea.style.width = width.toString();
gameArea.style.height = height.toString();
var canvas = document.getElementById('canvas');
if (!canvas.getContext) {
    alert('Canvas is not supported!');
}
var context = canvas.getContext('2d');
//console.log(canvas.height);
//console.log(canvas.width);
canvas.width = width;
canvas.height = height;
console.log(width);
console.log(height);
console.log(sqWidth);
console.log(sqHeight);
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
//  context.fillStyle = 'blue';
//  context.fillRect(sqWidth*3, sqHeight*3, sqWidth, sqHeight);
//  context.fillRect(sqWidth*4, sqHeight*3, sqWidth, sqHeight);
//  context.fillRect(sqWidth*5, sqHeight*3, sqWidth, sqHeight);
//  context.fillRect(sqWidth*5, sqHeight*4, sqWidth, sqHeight);
//  context.fillRect(sqWidth*(columns-1), sqHeight*(rows-1), sqWidth, sqHeight);
