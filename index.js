// get jsons
const fs = require('fs');
//const random = require('./random');

const readFileAsJson = (path) => {
    var fileText = fs.readFileSync(path);
    return JSON.parse(fileText);
}

const elementsPath = './elements'

const elementFiles = fs.readdirSync(elementsPath);
const elementJsons = {}

elementFiles.forEach((v) => {
    const key = v.split('.')[0];
    elementJsons[key] = readFileAsJson(`${elementsPath}/${v}`);
});

// generate random characteristics
const randomNumber = (min, max) => {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

//based on https://softwareengineering.stackexchange.com/a/150618/171136
const randomWithWeight = (array) => {
    let cummulativeWeightArray = []
    let weightSum = 0;

    array.forEach(element => {
        weightSum += element.weight;
        cummulativeWeightArray.push({ "value": element.value, "weight": weightSum });
    });

    const randomSelector = randomNumber(0, weightSum);
    const arrEl = cummulativeWeightArray.find(e => e.weight >= randomSelector);

    return arrEl.value;
}


const generateCharacter = () => {
    const character = {};

    Object.keys(elementJsons).forEach((key) => {
        character[key] = randomWithWeight(elementJsons[key]);
    })

    return character;
}

// output character
console.log(generateCharacter());