"use strict";
//A snake body will be made up of links
//Each link is a square
class Link {
    constructor(location, direction) {
        this.location = location;
        this.direction = direction;
    }
    drawSquare(color) {
        context.fillStyle = color;
        context.fillRect(this.location[0] * sqWidth, this.location[1] * sqHeight, sqWidth, sqHeight);
    }
    moveSquare() {
        this.location = [this.location[0] + this.direction[0], this.location[1] + this.direction[1]];
    }
}
class Snake {
    constructor(head) {
        this.head = head;
        this.body = new Array();
        this.body.push(this.head);
    }
    moveSnake(algorithm, food) {
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
        function checkWall(head) {
            let left = head.location[0] < 0;
            let right = head.location[0] >= columns;
            let up = head.location[1] < 0;
            let down = head.location[1] >= rows;
            if (left || right || up || down)
                return true;
            return false;
        }
        function checkSnakeHitBody(snake) {
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
        function getAdjacent(location, body) {
            let result = new Array();
            //Checks if they are in range
            if (location[0] - 1 >= 0) { //left
                result.push([location[0] - 1, location[1]]);
            }
            if (location[0] + 1 < columns) { // right
                result.push([location[0] + 1, location[1]]);
            }
            if (location[1] - 1 >= 0) { //Up
                result.push([location[0], location[1] - 1]);
            }
            if (location[1] + 1 < rows) { //down
                result.push([location[0], location[1] + 1]);
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
        function distanceToFood(location) {
            let x2 = location[0];
            let y2 = location[1];
            let x1 = food[0];
            let y1 = food[1];
            let a = (x2 - x1) * (x2 - x1);
            let b = (y2 - y1) * (y2 - y1);
            return Math.sqrt(a + b);
        }
        function greedyAlgorithm(snake) {
            let adjacent = getAdjacent(snake.head.location, snake.body);
            if (adjacent.length == 0) {
                return [0, 0];
            }
            //let minDistance = distanceToFood(adjacent[0]);
            let minDistance = Number.MAX_SAFE_INTEGER;
            //let newDirection: [number, number] = [adjacent[0][0] - snake.head.location[0], adjacent[0][1] - snake.head.location[1]];
            let newDirection = [0, 0];
            for (let i = 0; i < adjacent.length; i++) {
                let temp = distanceToFood(adjacent[i]);
                if (temp < minDistance) {
                    let tempDirection = [adjacent[i][0] - snake.head.location[0], adjacent[i][1] - snake.head.location[1]];
                    let newLocation = [snake.head.location[0] + tempDirection[0], snake.head.location[1] + tempDirection[1]];
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
        /*function isSnakeBody(grid: number[][], pos: [number, number]): boolean {
            let g  = grid;
            if (g[pos[0]][pos[1]] == 1) return true;
            return false;
        }*/
        function equals(pos1, pos2) {
            if (pos1[0] == pos2[0] && pos1[1] == pos2[1])
                return true;
            return false;
        }
        function getPath(path, start, cur) {
            let result = [];
            let equals = start[0] == cur[0] && start[1] == cur[1];
            while (!equals) {
                result.push(cur);
                let curPos = cur[0] + "," + cur[1];
                cur = path.get(curPos);
                equals = start[0] == cur[0] && start[1] == cur[1];
            }
            result.push(start);
            result.reverse();
            return result;
        }
        function bfs(snake) {
            //Create Grid
            /*let grid: number[][] = [];
            for (let i = 0; i < rows; i++) {
                grid.push([0]);
                for (let j = 0; j < columns; j++) {
                    grid[i][j] = 0;
                }
            }
            for (let i = 0; i < snake.body.length; i++) {
                grid[snake.body[i].location[0]][snake.body[i].location[1]] = 1;
            }*/
            //Now that grid is setup start algorithm
            let marked = new Map(); //Hashmap to store booleans if already visited
            let path = new Map(); //Hashmap to store the previous spots
            let queue = new Queue();
            queue.enqueue(snake.head.location);
            while (!queue.isEmpty()) {
                let cur = queue.dequeue();
                let curPos = cur.val[0] + "," + cur.val[1];
                marked.set(curPos, true);
                let adjacent = getAdjacent(cur.val, snake.body);
                for (let i = 0; i < adjacent.length; i++) {
                    let node = adjacent[i];
                    let nodePos = adjacent[i][0] + "," + adjacent[i][1];
                    if (marked.get(nodePos) != true /*&& !isSnakeBody(grid, node)*/) {
                        let end = node[0] == food[0] && node[1] == food[1];
                        if (end) {
                            path.set(nodePos, cur.val);
                            return getPath(path, snake.head.location, node);
                        }
                        queue.enqueue(node);
                        marked.set(nodePos, true);
                        path.set(nodePos, cur.val);
                    }
                }
            }
        }
        if (algorithm == 1) {
            let path = bfs(this);
            if (path == undefined) {
                //Use greedy to decide which way to go
                this.head.direction = greedyAlgorithm(this);
            }
            else {
                let newLocation = path[1];
                console.log(this.head.location);
                console.log(newLocation);
                this.head.direction = [newLocation[0] - this.head.location[0], newLocation[1] - this.head.location[1]];
            }
        }
        else if (algorithm == 2) {
            this.head.direction = greedyAlgorithm(this);
        }
        else {
            return false;
        }
        if (this.head.direction == [0, 0]) {
            return false; //signifying end game
        }
        let oldDirections = new Array(this.body.length);
        for (let i = 0; i < this.body.length; i++) {
            oldDirections[i] = this.body[i].direction;
        }
        this.body[0].moveSquare();
        for (let i = 1; i < this.body.length; i++) {
            this.body[i].moveSquare();
            this.body[i].direction = oldDirections[i - 1];
        }
        if (checkWall(this.head)) {
            return false; //signifying end game
        }
        else if (checkSnakeHitBody(this)) {
            return false; //signifying end game
        }
        return true;
    }
    drawSnake() {
        this.body[0].drawSquare('purple');
        for (let i = 1; i < this.body.length; i++) {
            this.body[i].drawSquare('blue');
        }
    }
    addLink() {
        //First check to see which direction the tail is going, because the link we add will go the same direction
        let tail = this.body[this.body.length - 1];
        let newXLocation = tail.location[0] - tail.direction[0];
        let newYLocation = tail.location[1] - tail.direction[1];
        this.body.push(new Link([newXLocation, newYLocation], [tail.direction[0], tail.direction[1]]));
    }
}
