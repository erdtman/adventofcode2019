const fs = require('fs');
const processor = require('./processor.js')

const memory = fs.readFileSync('day7/js/input', 'utf-8')
    .split(',')
    .filter(value => value !== '')
    .map(value => Number(value));

let max = 0;

for (let index = 0; index < 100000; index++) {
    try {
        const settings = Array.from(String(index).padStart(5, '0'), Number);

        if (settings[0] > 4 || 
            settings[1] > 4 ||
            settings[2] > 4 ||
            settings[3] > 4 ||
            settings[4] > 4) {
            continue;
        }

        if(new Set(settings).size !== settings.length) {
            continue;
        }

        const Aout = processor(memory, [0,   settings[0]]);
        const Bout = processor(memory, [Aout,settings[1]]);
        const Cout = processor(memory, [Bout,settings[2]]);
        const Dout = processor(memory, [Cout,settings[3]]);
        const out =  processor(memory, [Dout,settings[4]]);
        
        if(out > max) {
            max = out;
        }   
    
        
    } catch (error) {
       //console.log(error);
    }   
}

console.log(`Max: ${max}`);


