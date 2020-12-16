"use strict";
const gameArea = document.getElementById('game-area');
const height = gameArea.offsetHeight;
const width = gameArea.offsetWidth;
const ratio = height / width;
console.log(ratio);
const columns = 101;
const rows = Math.ceil(ratio * 100);
console.log(rows / columns);
var canvas = document.getElementById('canvas');
if (!canvas.getContext) {
    alert('Canvas is not supported!');
}
var context = canvas.getContext('2d');
//console.log(canvas.height);
//console.log(canvas.width);
canvas.width = width;
canvas.height = height;
const sqWidth = Math.floor(width / columns);
const sqHeight = Math.floor(height / rows);
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
/*context.fillRect(0, 0, width, 1);
context.fillRect(0, 0, 1, height);
context.fillRect(0, sqHeight * rows-1, width, 1);
context.fillRect(sqWidth* columns, 0, 1, height);

context.fillStyle = 'blue';
context.fillRect(sqWidth*3, sqHeight*3, sqWidth, sqHeight);
context.fillRect(sqWidth*4, sqHeight*3, sqWidth, sqHeight);
context.fillRect(sqWidth*5, sqHeight*3, sqWidth, sqHeight);
context.fillRect(sqWidth*5, sqHeight*4, sqWidth, sqHeight);

context.fillRect(sqWidth*(columns-1), sqHeight*(rows-1), sqWidth, sqHeight);*/ 
