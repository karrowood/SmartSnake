"use strict";
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
function bfs(snake, food) {
    //Create Grid
    let marked = new Map(); //Hashmap to store booleans if already visited
    let path = new Map(); //Hashmap to store the previous spots
    let queue = new Array();
    queue.push(snake.head.location);
    while (queue.length != 0) {
        let cur = queue.shift();
        let curPos = cur[0] + "," + cur[1];
        marked.set(curPos, true);
        let adjacent = getAdjacent(cur, snake.body);
        for (let i = 0; i < adjacent.length; i++) {
            let node = adjacent[i];
            let nodePos = adjacent[i][0] + "," + adjacent[i][1];
            if (marked.get(nodePos) != true) {
                let end = node[0] == food[0] && node[1] == food[1];
                if (end) {
                    path.set(nodePos, cur);
                    return getPath(path, snake.head.location, node);
                }
                queue.push(node);
                marked.set(nodePos, true);
                path.set(nodePos, cur);
            }
        }
    }
}
