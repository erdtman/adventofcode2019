const fs = require('fs');
const processor = require('./processor.js')

const memory = fs.readFileSync('day2/js/input', 'utf-8')
    .split(',')
    .filter(value => value !== '')
    .map(value => Number(value));

const fule = processor(memory, 12, 02);

console.log(fule);
