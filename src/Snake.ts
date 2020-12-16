//A snake body will be made up of links
//Each link is a square
class Link {
    location: [number, number];
    direction: [number,number];
    constructor(location: [number, number], direction: [number, number]) {
        this.location = location;
        this.direction = direction;
    }
    drawSquare(color: string): void {
        context.fillStyle = color;
        context.fillRect(this.location[0] * sqWidth, this.location[1] * sqHeight, sqWidth, sqHeight);
    }
    moveSquare(): void {
        this.location = [this.location[0] + this.direction[0], this.location[1] + this.direction[1]];
    }
}    
class Snake {
    head: Link;
    body: Link[];
    constructor(head: Link) {
        this.head = head;
        this.body = new Array();
        this.body.push(this.head);
    }
    moveSnake(food: [number, number]): boolean {
        /*function goRight(snake: Snake): void {
            snake.head.direction = [1,0];
        }
        function goLeft(snake: Snake): void {
            snake.head.direction = [-1,0];
        }
        function goUp(snake: Snake): void {
            snake.head.direction = [0,-1];
        }
        function goDown(snake: Snake): void {
            snake.head.direction = [0,1];
        }*/
        function checkWall(head: Link): boolean {
            let left = head.location[0] < 0;
            let right = head.location[0] >= columns;
            let up = head.location[1] < 0;
            let down = head.location[1] >= rows;
            if (left || right || up || down)
                return true;
            return false;
        }
        function checkSnakeHitBody(snake: Snake): boolean {
            for (let i = 1; i < snake.body.length; i++) {
                let x = snake.head.location[0] == snake.body[i].location[0];
                let y = snake.head.location[1] == snake.body[i].location[1];
                if (x && y) {
                    return true;
                }
            }
            return false;
        }
        //Returns the adjacent squares as long as they are not a wall or part of the body
        function getAdjacent(location: [number, number], body: Link[]): [number, number][] {
            let result: [number, number][] = new Array();
            //Checks if they are in range
            if (location[0]-1 >= 0) { //left
                result.push([location[0]-1, location[1]]);
            }
            if (location[0]+1 < columns) { // right
                result.push([location[0]+1, location[1]]);
            }
            if (location[1]-1 >= 0) { //Up
                result.push([location[0], location[1]-1]);
            }
            if (location[1]+1 < rows) { //down
                result.push([location[0], location[1]+1]);
            }
            //Removes them if they are a part of the body
            for (let i = 0; i < body.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    let x = result[j][0] == body[i].location[0];
                    let y = result[j][1] == body[i].location[1];
                    if (x && y) {
                        result.splice(j, 1); //removes that element
                        j--;
                    }
                }
            }
            return result;
        }
        // d = sqrt((x2-x1)^2 + (y2-y1)^2)
        function distanceToFood(location: [number, number]): number {
            let x2 = location[0];
            let y2 = location[1];
            let x1 = food[0];
            let y1 = food[1];
            let a = (x2 - x1) * (x2 - x1);
            let b = (y2 - y1) * (y2 - y1);
            return Math.sqrt(a + b);
        }
        function greedyAlgorithm(snake: Snake): [number, number] {
            let adjacent: [number, number][] = getAdjacent(snake.head.location, snake.body);
            if (adjacent.length == 0) {
                return [0,0];
            }
            //let minDistance = distanceToFood(adjacent[0]);
            let minDistance = Number.MAX_SAFE_INTEGER;
            //let newDirection: [number, number] = [adjacent[0][0] - snake.head.location[0], adjacent[0][1] - snake.head.location[1]];
            let newDirection: [number, number] = [0,0];
            for (let i = 0; i < adjacent.length; i++) {
                let temp = distanceToFood(adjacent[i]);
                if (temp < minDistance) {
                    let tempDirection: [number, number] = [adjacent[i][0] - snake.head.location[0], adjacent[i][1] - snake.head.location[1]];
                    let newLocation: [number, number] = [snake.head.location[0] + tempDirection[0], snake.head.location[1] + tempDirection[1]];
                    let trapped = getAdjacent(newLocation, snake.body).length == 0;
                    if (trapped) {
                        continue;
                    }
                    minDistance = temp;
                    newDirection = tempDirection;
                }
            }
            return newDirection;
        }
        this.head.direction = greedyAlgorithm(this);
        if (this.head.direction == [0,0]) {
            return false; //signifying end game
        }
        let oldDirections = new Array(this.body.length);
        for (let i = 0; i < this.body.length; i++) {
            oldDirections[i] = this.body[i].direction;
        }
        this.body[0].moveSquare();
        for (let i = 1; i < this.body.length; i++) {
            this.body[i].moveSquare();
            this.body[i].direction = oldDirections[i-1];
        }
        if (checkWall(this.head)) {
            return false; //signifying end game
        }
        else if (checkSnakeHitBody(this)) {
            return false; //signifying end game
        }
        return true;
    }
    drawSnake(): void {
        this.body[0].drawSquare('purple');
        for (let i = 1; i < this.body.length; i++) {
            this.body[i].drawSquare('blue');
        }
    }
    addLink(): void {
        //First check to see which direction the tail is going, because the link we add will go the same direction
        let tail = this.body[this.body.length-1];
        let newXLocation = tail.location[0] - tail.direction[0];
        let newYLocation = tail.location[1] - tail.direction[1];
        this.body.push(new Link([newXLocation, newYLocation], [tail.direction[0], tail.direction[1]]));
    }
}