// get jsons
const fs = require('fs');
//const random = require('./random');

const readFileAsJson = (path) => {
    var fileText = fs.readFileSync(path);
    return JSON.parse(fileText);
}

const ageJson = readFileAsJson('./elements/age.json');
const bodyShapeJson = readFileAsJson('./elements/body-shape.json');
const faceShapeJson = readFileAsJson('./elements/face-shape.json');
const gendersJson = readFileAsJson('./elements/genders.json');
const heightsJson = readFileAsJson('./elements/heights.json');
const skinColorsJson = readFileAsJson('./elements/skin-colors.json');

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

    //cummulativeWeightArray.sort((first, second) => first.weight < second.weight);
    console.log(cummulativeWeightArray);

    const randomSelector = randomNumber(0, weightSum);
    const arrEl = cummulativeWeightArray.find(e => e.weight >= randomSelector);
    console.log(randomSelector);
    console.log(arrEl);

    return arrEl.value;
}


const generateCharacter = () => {
    const age = randomWithWeight(ageJson);
    const abstractBodyShape = bodyShapeJson['abstract-shapes'][randomNumber(0, bodyShapeJson['abstract-shapes'].length)];
    const bodyShape = bodyShapeJson['shapes'][randomNumber(0, bodyShapeJson['shapes'].length)];
    const faceShape = faceShapeJson['shapes'][randomNumber(0, bodyShapeJson['shapes'].length)];
    const gender = randomWithWeight(gendersJson);
    const height = heightsJson['heights'][randomNumber(0, heightsJson['heights'].length)];
    const skinColor = skinColorsJson['skin_colors'][randomNumber(0, skinColorsJson['skin_colors'].length)];

    const character = {
        "age": age,
        "abstractBodyShape": abstractBodyShape,
        "bodyShape": bodyShape,
        "faceShape": faceShape,
        "gender": gender,
        "height": height,
        "skinColor": skinColor
    };

    return character;
}

// output character
console.log(generateCharacter());