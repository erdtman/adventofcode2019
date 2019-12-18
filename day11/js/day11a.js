const fs = require('fs');
const processor = require('./processor.js')




const memory = fs.readFileSync('day11/js/input', 'utf-8')
    .split(',')
    .filter(value => value !== '')
    .map(value => Number(value));


const position = [0,0];

const UP = 0;
const RIGHT = 1;
const DOWN = 2
const LEFT = 3

let direction = 0;
function updateDirection(turn) {
    direction += turn;
    direction = direction ===  4 ? UP : direction;
    direction = direction === -1 ? LEFT : direction;
}
function move() {
    switch(direction){
        case UP:
            position[0]++;
            break;
        case RIGHT:
            position[1]++;
            break;
        case DOWN:
            position[0]--;
            break;
        case LEFT:
            position[1]--;
            break;
        default:
            throw new Error(`unknown direction, ${direction}`);
    }
}

const painted = {};

function read() {
    const value = painted[`${position[0]}x${position[1]}`] === 'WHITE' ? 1 : 0;
    console.log(`READ ${position[0]} x ${position[1]} = ${value}`);
    return  value;
}

let timeToMove = false;
function write(value) {
    console.log(`WRITE mode=${timeToMove}, current pos= ${position[0]} x ${position[1]}`);
    if (timeToMove) {
        updateDirection(value === 1 ? 1 : -1)
        move();
        console.log(`WRITE new pos= ${position[0]} x ${position[1]}`);
    } else {
        painted[`${position[0]}x${position[1]}`] = value === 0 ? 'BLACK' : 'WHITE';
    }

    timeToMove = !timeToMove;
}
processor(memory, read, write);

console.log(painted);
console.log(Object.keys(painted).length);

