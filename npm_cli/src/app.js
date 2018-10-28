var argv = require('yargs').argv

console.log('Hello, ' + (argv.name || 'world'))