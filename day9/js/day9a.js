const fs = require('fs');
const processor = require('./processor.js')

const memory = fs.readFileSync('day9/js/input', 'utf-8')
    .split(',')
    .filter(value => value !== '')
    .map(value => Number(value));

const out =  processor(memory, [1]);
console.log(out);
