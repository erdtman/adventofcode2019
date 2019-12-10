
const lowerBound = 246540;
const upperBound = 787419;


const validPasswords = []
for (let index = lowerBound-1; index <= upperBound; index++) {
    const numbers = Array.from(String(index), Number);

    // has adjcent numbers
    if (!(numbers[0] === numbers[1] ||
        numbers[1] === numbers[2] ||
        numbers[2] === numbers[3] ||
        numbers[3] === numbers[4] ||
        numbers[4] === numbers[5])) {
            continue;
    }

    // always increasing 
    if (!(numbers[0] <= numbers[1] &&
        numbers[1] <= numbers[2] &&
        numbers[2] <= numbers[3] &&
        numbers[3] <= numbers[4] &&
        numbers[4] <= numbers[5])) {
            continue;
    }
    
    validPasswords.push(index);
}

console.log(validPasswords);
console.log(validPasswords.length);

