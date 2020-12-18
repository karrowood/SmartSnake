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
        switch (algorithm) {
            case 1:
                let path = bfs(this, food);
                if (path != undefined) {
                    let newLocation = path[1];
                    this.head.direction = [newLocation[0] - this.head.location[0], newLocation[1] - this.head.location[1]];
                }
                break;
            case 2:
                this.head.direction = greedyAlgorithm(this, food);
                break;
            case 3:
                let combination = bfs(this, food);
                if (combination == undefined) {
                    //Use greedy to decide which way to go
                    this.head.direction = greedyAlgorithm(this, food);
                }
                else {
                    let newLocation = combination[1];
                    this.head.direction = [newLocation[0] - this.head.location[0], newLocation[1] - this.head.location[1]];
                }
                break;
            case 4:
                let esc = bfs(this, food);
                if (esc == undefined) {
                    //Use greedy to decide which way to go
                    this.head.direction = escape(this, food);
                }
                else {
                    let newLocation = esc[1];
                    this.head.direction = [newLocation[0] - this.head.location[0], newLocation[1] - this.head.location[1]];
                }
                break;
            default:
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
        for (let i = 0; i < this.body.length; i++) {
            this.body[i].drawSquare('rgb(200,0,200)');
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
