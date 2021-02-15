const gameArea = document.getElementById('game-area') as HTMLElement;
var width: number;
var height: number;
var columns: number;
var rows: number;
var sqWidth: number;
var sqHeight: number;
var context: CanvasRenderingContext2D;

//Set size using the slider
var sizeSlider = document.getElementById("size") as HTMLInputElement;
function setupGrid(): void {
    width = gameArea.offsetWidth;
    height = gameArea.offsetHeight;

    var size: number = +sizeSlider.value;
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
    var background = document.getElementById('background') as HTMLCanvasElement;
    if (!background.getContext) {
        alert('Canvas is not supported!');
    }
    var backgroundContext = background.getContext('2d') as CanvasRenderingContext2D;
    background.width = width;
    background.height = height;
    backgroundContext.fillStyle = 'rgb(35, 235, 8)';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let offset = 0;
            if (i % 2 == 0) offset = 1;
            if (((j + offset) % 2) == 0) backgroundContext.fillRect(sqWidth*j, sqHeight*i, sqWidth, sqHeight);
        }
    }

    //Game layer
    var canvas = document.getElementById('game') as HTMLCanvasElement;
    if (!canvas.getContext) {
        alert('Canvas is not supported!');
    }
    context = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = width;
    canvas.height = height;
}
setupGrid();


var speedSlider = document.getElementById("speed") as HTMLInputElement;
var speed: number;
function setSpeed(): void {
    speed = +speedSlider.value;
    speed = Math.abs(30 - speed);
}
setSpeed();

//Causes page to reload when window is resized
/*window.onresize = function() {
    location.reload();
}*/


