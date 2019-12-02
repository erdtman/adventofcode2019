
const ADD = 1;
const MUL = 2;
const EXIT = 99;

module.exports = function (memory, noun, verb) {
    const localMemory  = memory.slice(0)
    localMemory[1] = noun;
    localMemory[2] = verb;
    for (let index = 0; ; index += 4) {
        const instruction = localMemory[index];
        if (instruction === ADD) {
            const address1 = localMemory[index + 1];
            const address2 = localMemory[index + 2];
            const out_address = localMemory[index + 3];
            localMemory[out_address] = localMemory[address1] + localMemory[address2];
        } else if (instruction === MUL) {
            const address1 = localMemory[index + 1];
            const address2 = localMemory[index + 2];
            const out_address = localMemory[index + 3];
            localMemory[out_address] = localMemory[address1] * localMemory[address2];
        } else if (instruction === EXIT) {
            break;
        } else {
            throw new Error(`unknown op code, ${op}`);
        }
    }
    return localMemory[0];
}