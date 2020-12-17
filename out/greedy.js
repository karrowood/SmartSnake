"use strict";
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
function distanceToFood(location, food) {
    let x2 = location[0];
    let y2 = location[1];
    let x1 = food[0];
    let y1 = food[1];
    let a = (x2 - x1) * (x2 - x1);
    let b = (y2 - y1) * (y2 - y1);
    return Math.sqrt(a + b);
}
function greedyAlgorithm(snake, food) {
    let adjacent = getAdjacent(snake.head.location, snake.body);
    if (adjacent.length == 0) {
        return [0, 0];
    }
    //let minDistance = distanceToFood(adjacent[0]);
    let minDistance = Number.MAX_SAFE_INTEGER;
    //let newDirection: [number, number] = [adjacent[0][0] - snake.head.location[0], adjacent[0][1] - snake.head.location[1]];
    let newDirection = [0, 0];
    for (let i = 0; i < adjacent.length; i++) {
        let temp = distanceToFood(adjacent[i], food);
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
//Escape is similar to the greedy, but goes the opposite direction in hope of finding open area
function escape(snake, food) {
    let adjacent = getAdjacent(snake.head.location, snake.body);
    if (adjacent.length == 0) {
        return [0, 0];
    }
    //let minDistance = distanceToFood(adjacent[0]);
    let maxDistance = 0;
    //let newDirection: [number, number] = [adjacent[0][0] - snake.head.location[0], adjacent[0][1] - snake.head.location[1]];
    let newDirection = [0, 0];
    for (let i = 0; i < adjacent.length; i++) {
        let temp = distanceToFood(adjacent[i], food);
        if (temp > maxDistance) {
            let tempDirection = [adjacent[i][0] - snake.head.location[0], adjacent[i][1] - snake.head.location[1]];
            let newLocation = [snake.head.location[0] + tempDirection[0], snake.head.location[1] + tempDirection[1]];
            let trapped = getAdjacent(newLocation, snake.body).length == 0;
            if (trapped) {
                continue;
            }
            maxDistance = temp;
            newDirection = tempDirection;
        }
    }
    return newDirection;
}
