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
