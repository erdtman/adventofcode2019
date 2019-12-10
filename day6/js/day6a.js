const fs = require('fs');

const orbits = fs.readFileSync('day6/js/input', 'utf-8')
    .split('\n')
    .filter(value => value !== '')
    .map(value => value.split(')'));

function countOrbits(currentNode, valueOfOrbit) {
    
    const externalOrbitsCount = orbits
        .filter(value => currentNode === value[0])
        .map(nextLevel => countOrbits(nextLevel[1], valueOfOrbit + 1))
        .reduce((a, b) => a + b, 0);
    return externalOrbitsCount + valueOfOrbit;
}

const orbitCount = countOrbits("COM",0);

console.log(orbitCount);
