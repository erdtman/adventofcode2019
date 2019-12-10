
const ADD = 1;
const MUL = 2;
const IN = 3;
const OUT = 4;
const EXIT = 99;


const MODE_I = 1;

module.exports = function (memory, noun, verb, input) {
    const localMemory  = memory.slice(0)
    function getValue(param, value) {
        return param === MODE_I ? value : localMemory[value];
    }
    //localMemory[1] = noun;
    //localMemory[2] = verb;
    done:
    for (let index = 0;;) {
        const instruction = localMemory[index] % 100;
        const [, param2, param1,,] = Array.from(localMemory[index].toString(10).padStart(5, '0'), Number);
        switch (instruction) {
            case ADD:
            case MUL: {
                const value1 = getValue(param1, localMemory[index + 1]);
                const value2 = getValue(param2, localMemory[index + 2]);
                const out_address = localMemory[index + 3];
                localMemory[out_address] = instruction === ADD ? value1 + value2 : value1 * value2;
                if (instruction === ADD) {
                    localMemory[out_address] = value1 + value2;
                } else if (instruction === MUL) {
                    localMemory[out_address] = value1 * value2;
                }
                index += 4
                break;
            } case IN: {
                const address1 = localMemory[index + 1];
                localMemory[address1] = input.pop();
                index += 2
                break;
            } case OUT: {
                const address1 = localMemory[index + 1];
                console.log(localMemory[address1]);
                index += 2
                break;
            } case EXIT: {
                break done;
            } default: {
                throw new Error(`unknown op code, ${instruction}`);
            } 
        }
    }
    return localMemory[0];
}