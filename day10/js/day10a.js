const fs = require('fs');
const dtls = require('distance-to-line-segment');

const space = fs.readFileSync('day10/js/input', 'utf-8')
    .split('\n')
    .filter(value => value !== '')
    .map(value => value.split(''));

const astroids = [];
for (let y = 0; y < space.length; y++) {
    const row = space[y];
    for (let x = 0; x < row.length; x++) {
        if(row[x] === '#'){
            astroids.push([x,y]);
        }    
    }
}

function equal(a,b) {
    return a[0] === b[0] && a[1] === b[1];
}

let maxInSight = 0;
let maxInSightCoordinates;
astroids.forEach(outerAstroid => {
    const inSight = [];
    astroids
     .filter(innerAstroid => !equal(innerAstroid, outerAstroid))
     .forEach(innerAstroid => {        
        const min = astroids
         .filter(astroidCheck => !equal(astroidCheck, outerAstroid))
         .filter(astroidCheck => !equal(astroidCheck, innerAstroid))
         .map(astroidCheck => dtls.squared(
                    outerAstroid[0], outerAstroid[1],
                    innerAstroid[0], innerAstroid[1],
                    astroidCheck[0], astroidCheck[1]))
         .reduce((min, cur) => Math.min(min, cur), 1);
        
        if (min !== 0) {
            inSight.push(innerAstroid)
        }
    });
    
    if (inSight.length > maxInSight) {
        maxInSight = inSight.length;
        maxInSightCoordinates = JSON.stringify(outerAstroid);
    }
});

console.log(`${maxInSightCoordinates} has ${maxInSight} in sight`);

