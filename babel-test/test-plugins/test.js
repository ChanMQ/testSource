const babel = require("@babel/core")
const { first, second } = require('./plugin')

const resource = "a === b"
const { code } =  babel.transformSync(resource, {
    plugins: [
        first,
        second
    ],
    // presets: [
    //     function() {
    //         return {
    //             plugins: [ first ]
    //         }
    //     },
    //     function() {
    //         return {
    //             plugins: [ second ]
    //         }
    //     }
    // ]
})

console.log(code)
