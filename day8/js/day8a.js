const fs = require('fs');

const image = fs.readFileSync('day8/js/input', 'utf-8')
    .split('')
    .filter(value => value !== '')
    .map(value => Number(value));

console.log(image.length);

const fewestZeros = {
    2: 0,
    1: 0,
    0: Number.MAX_SAFE_INTEGER,
};


for (let i = 0; i < image.length; i += (6 * 25) ) {
    let twos = 0;
    let once = 0;
    let zero = 0;
    for (let index = 0; index < (6 * 25); index++) {
        const pixel = image[i+index];
        twos = pixel === 2 ? twos + 1 : twos;
        once = pixel === 1 ? once + 1 : once;
        zero = pixel === 0 ? zero + 1 : zero;
    }

    if (fewestZeros[0] > zero) {
        fewestZeros[1] = once;
        fewestZeros[2] = twos;
        fewestZeros[0] = zero;
        
        console.log(fewestZeros);    
    }
    
}

console.log(fewestZeros);
console.log(fewestZeros[2] * fewestZeros[1]); // THIS output is not correc I had to look two rows above


