
const fs = require('fs');
const findSegmentIntersection = require('line-intersection').findSegmentIntersection;

function parseInstruction(value){
    return {
        direction: value.substring(0,1), 
        distance: Number(value.substring(1))
    }
}

const [wire1instructions, wire2instructions] = fs
    .readFileSync('day3/js/input', 'utf-8')
    .split('\n')
    .filter(value => value !== '');

const wire1path = wire1instructions
    .split(',')
    .filter(value => value !== '')
    .map(parseInstruction);

const wire2path = wire2instructions
    .split(',')
    .filter(value => value !== '')
    .map(parseInstruction);

console.log(wire1path);
console.log(wire2path);


function calculateNext(instruction, currentLocation) {
    switch (instruction.direction) {
        case 'U':
            return {
                x: currentLocation.x,
                y: currentLocation.y + instruction.distance
            }
        case 'D':
            return {
                x: currentLocation.x,
                y: currentLocation.y - instruction.distance
            }
        case 'R':
            return {
                x: currentLocation.x + instruction.distance,
                y: currentLocation.y
            }
        case 'L':
            return {
                x: currentLocation.x - instruction.distance,
                y: currentLocation.y
            }
        default:
            throw new Error(`Unknown direction '${instruction.direction}'`);
    }
}

function getLines(wirepath) {
    let currentLocation = {x:0, y:0}; 
    const wirelines = [];
    wirepath.forEach(value => {
        const line = {
            a: {
                x:currentLocation.x,
                y:currentLocation.y
            },
            b: calculateNext(value, currentLocation)
        }
        wirelines.push(line)
        currentLocation = JSON.parse(JSON.stringify(line.b));
    });
    
    
    return wirelines;
}

const wire1lines = getLines(wire1path)
const wire2lines = getLines(wire2path)


console.log(wire1lines);
console.log(wire2lines);

const intersections = [];
wire1lines.forEach(line1 => {
    wire2lines.forEach(line2 => {
        intersections.push(findSegmentIntersection([line1.a, line1.b, line2.a, line2.b]));
    });
});

console.log(intersections);

const distances = intersections
    .filter(value => value)
    .filter(value => value.x !== 0 && value.y !== 0)
    .map(value => Math.abs(value.x) + Math.abs(value.y))
const minDistance = Math.min(...distances);
console.log(minDistance);


/*
...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........
*/
