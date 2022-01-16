// internal nodejs module

// const fs = require('fs');

// fs.copyFileSync("file1.txt", "file2.txt");

// external nodejs module

const superheroes = require('superheroes');
const supervillains = require('supervillains');

var supervillainsnames = supervillains.random();
var superheroesnames = superheroes.random();

console.log(superheroesnames);
console.log(supervillainsnames);