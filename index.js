// get jsons
const fs = require('fs');

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

const age = randomNumber(ageJson['min'], ageJson['max'])
const abstractBodyShape = bodyShapeJson['abstract-shapes'][randomNumber(0, bodyShapeJson['abstract-shapes'].length)];
const bodyShape = bodyShapeJson['shapes'][randomNumber(0, bodyShapeJson['shapes'].length)];
const faceShape = faceShapeJson['shapes'][randomNumber(0, bodyShapeJson['shapes'].length)];
const gender = gendersJson['genders'][randomNumber(0, gendersJson['genders'].length)];
const height = heightsJson['heights'][randomNumber(0, heightsJson['heights'].length)];
const skinColor = skinColorsJson['skin_colors'][randomNumber(0, skinColorsJson['skin_colors'].length)];

// create character

const character = {
    "age" : age,
    "abstractBodyShape" : abstractBodyShape,
    "bodyShape" : bodyShape,
    "faceShape" : faceShape,
    "gender" : gender,
    "height" : height,
    "skinColor" : skinColor
};

// output character
console.log(character);