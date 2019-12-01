const fs = require('fs');

function calculateFule(mass) {
    const neededFule = Math.max(0, Math.floor(mass/3-2))
    return neededFule === 0 ? 0 : neededFule + calculateFule(neededFule)
}

const fuleNeeded = fs.readFileSync('day1/js/input', 'utf-8')
    .split('\n')
    .filter(value => value != '')
    .map(value => calculateFule(value))
    .reduce((a, b) => a + b, 0);

console.log(fuleNeeded);
