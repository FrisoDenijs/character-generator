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

const femaleNames = readFileAsJson('./names/female.json');
const maleNames = readFileAsJson('./names/male.json');

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
    const arrEl = cummulativeWeightArray.find(e => e.weight > randomSelector);

    return arrEl.value;
}

const generateCharacter = () => {
    const character = {};

    Object.keys(elementJsons).forEach((key) => {
        character[key] = randomWithWeight(elementJsons[key]);
    })

    const name = character["gender"].indexOf("woman") >= 0 ? femaleNames[randomNumber(0, femaleNames.length)] : 
                                                         maleNames[randomNumber(0, maleNames.length)];

    character["name"] = name;

    return character;
}

const characters = [];
const charAmount = 12;

for (let i = 0; i < charAmount; i++) {
    characters.push(generateCharacter());
}


// output character
fs.writeFileSync('./characters.json', JSON.stringify(characters));