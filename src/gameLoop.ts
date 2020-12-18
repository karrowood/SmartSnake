//Generates a random number between 0 and range
function generateRandom(range: number): number {
    return Math.floor(Math.random() * (range+1));
}
function generateRandomLocation(): [number, number] {
    let location: [number, number] = [0,0];
    location[0] = generateRandom(columns-1);
    location[1] = generateRandom(rows-1);
    return location;
}

var displayScore = document.getElementById('score') as InnerHTML;
function gameLoop(algorithm: number): void {
    let head = new Link(generateRandomLocation(), [0,0]);
    let snake = new Snake(head);
    let food: [number, number] = generateRandomLocation();
    let running = true;
    let int = window.setInterval(go, 0);
    function go(): void {
        context.clearRect(0,0, width, height);
        var apple = document.getElementById("apple") as HTMLImageElement;
        context.drawImage(apple, sqWidth * food[0], sqHeight * food[1], sqWidth, sqHeight);
        snake.drawSnake();
        running = snake.moveSnake(algorithm, food);
        //Check if snake ate food
        let ateFood = (snake.head.location[0] == food[0]) && (snake.head.location[1] == food[1]);
        if (ateFood) {
            food = generateRandomLocation();
            for (let i = 0; i < snake.body.length; i++) {
                if (food[0] == snake.body[i].location[0] && food[1] == snake.body[i].location[1]) {
                    food = generateRandomLocation();
                    i = -1;
                }
            }
            snake.addLink();
            displayScore.innerHTML = "Score: " + (snake.body.length - 1);
        }
        if (!running) {
            clearInterval(int);
            button.disabled = false;
            select.disabled = false;
            return;
        }
    }
    
}

var button = document.getElementById("go") as HTMLInputElement;
var select = document.getElementById("algorithms") as HTMLSelectElement;
button.onclick = function() {
    let algorithm = select.value;
    if (algorithm == '') {
        alert('Please select and algorithm');
        return;
    }
    button.disabled = true;
    select.disabled = true;
    gameLoop(+algorithm);
}
