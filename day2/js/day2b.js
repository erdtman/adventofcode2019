const fs = require('fs');
const processor = require('./processor.js')

const memory = fs.readFileSync('day2/js/input', 'utf-8')
    .split(',')
    .filter(value => value !== '')
    .map(value => Number(value));

done:
for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
        if(processor(memory, noun, verb) === 19690720) {
            console.log(`noun: ${noun}`);
            console.log(`verb: ${verb}`);
            break done;
        }
    }
}

console.log('Done!');
