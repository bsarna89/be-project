const devData = require('./data/development-data');
const testData = require('./data/test-data');

//console.log(devData);
//console.log("-----------");
//console.log(testData);

const data = { dev: devData, test: testData };

const ENV = process.env.NODE_ENV || "dev";
console.log(ENV, "in files");

module.exports = data[ENV];