const fs = require('fs');

const orbits = fs.readFileSync('day6/js/input', 'utf-8')
    .split('\n')
    .filter(value => value !== '')
    .map(value => value.split(')'));

// find root

function countOrbits(currentNode, valueOfOrbit) {
    //console.log(`at ${currentNode} with value ${valueOfOrbit}`);
    
    const externalOrbitsCount = orbits
        .filter(value => currentNode === value[0])
        //.map(value => {console.log(value); return value})
        .map(nextLevel => countOrbits(nextLevel[1], valueOfOrbit + 1))
        .reduce((a, b) => a + b, 0);
    return externalOrbitsCount + valueOfOrbit;
}

const orbitCount = countOrbits("COM",0);

console.log(orbitCount);
