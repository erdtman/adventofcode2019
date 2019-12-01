const fs = require('fs');

const fuleNeeded = fs.readFileSync('day1/js/input', 'utf-8')
    .split('\n')
    .filter(value => value != '')
    .map(value => Math.floor(value/3-2))
    .reduce((a, b) => a + b, 0);

console.log(fuleNeeded);

