
const ADD = 1;
const MUL = 2;
const IN = 3;
const OUT = 4;
const JUMP_IF_TRUE = 5;
const JUMP_IF_FALSE = 6;
const LESS_THAN = 7;
const EQUALS = 8;
const ADJUST_RELATIVE_BASE = 9;
const EXIT = 99;

const MODE_P = 0;
const MODE_I = 1;
const MODE_R = 2;

module.exports = function (memory, read, write) {
    const localMemory  = memory.slice(0)
    
    for (let index = 0; index < 100000; index++) {
        localMemory.push(0);    
    }
    
    let relative_base = 0;
    done:
    for (let index = 0;;) {
        function getAdress(param, param_index) {
            if (param === MODE_P) {
                return localMemory[index + param_index];
            } else if (param === MODE_I) {
                return index + param_index;
            } else if (param === MODE_R) {
                return relative_base + localMemory[index + param_index]
            } else {
                throw new Error(`Unknown parameter ${param}`);
            }
        }

        const instruction = localMemory[index] % 100;
        const [param3, param2, param1,,] = Array.from(localMemory[index].toString(10).padStart(5, '0'), Number);
        // console.log(`index: ${index}, instruction: ${instruction}, relative_base: ${relative_base}, param1: ${param1}, param2: ${param2}, param3: ${param3}`);
        
        switch (instruction) {
            case ADD:
            case MUL: {
                const value1 = localMemory[getAdress(param1, 1)];
                const value2 = localMemory[getAdress(param2, 2)];
                const out_address = getAdress(param3, 3);
                if (instruction === ADD) {
                    // console.log(`ADD ${out_address} = ${value1} + ${value2}`);
                    localMemory[out_address] = value1 + value2;
                } else if (instruction === MUL) {
                    // console.log(`MUL ${out_address} = ${value1} * ${value2}`);
                    localMemory[out_address] = value1 * value2;
                }
                index += 4
                break;
            } case IN: {
                const address1 = getAdress(param1, 1);
                localMemory[address1] = read();
                // console.log(`IN ${address1}`);
                index += 2
                break;
            } case OUT: {
                const value1 = localMemory[getAdress(param1, 1)];
                //console.log(`OUT index: ${index}, value: ${value1}`);
                write(value1);
                index += 2;
                break;
            } case JUMP_IF_TRUE: {
                const value1 = localMemory[getAdress(param1, 1)];
                const value2 = localMemory[getAdress(param2, 2)];
                // console.log(`JUMP_IF_TRUE ${value1} to ${value2}`);
                index = value1 === 0 ? index+=3 : value2;
                break;
            } case JUMP_IF_FALSE: {
                const value1 = localMemory[getAdress(param1, 1)];
                const value2 = localMemory[getAdress(param2, 2)];
                // console.log(`JUMP_IF_FALSE ${value1} to ${value2}`);
                index = value1 === 0 ? value2 : index+=3;
                break;
            } case LESS_THAN: {
                const value1 = localMemory[getAdress(param1, 1)];
                const value2 = localMemory[getAdress(param2, 2)];
                const result = value1 < value2 ? 1 : 0;
                const out_address = getAdress(param3, 3);
                // console.log(`LESS_THAN ${out_address} = ${value1} < ${value2}`);
                localMemory[out_address] = result;
                index += 4
                break;
            } case EQUALS: {
                const value1 = localMemory[getAdress(param1, 1)];
                const value2 = localMemory[getAdress(param2, 2)];
                const result = value1 === value2 ? 1 : 0;
                const out_address = getAdress(param3, 3);
                // console.log(`EQUALS ${out_address} = ${value1} == ${value2}`);
                localMemory[out_address] = result;
                index += 4
                break;
            } case ADJUST_RELATIVE_BASE: {
                relative_base += localMemory[getAdress(param1, 1)];
                // console.log(`ADJUST_RELATIVE_BASE ${relative_base}`);
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