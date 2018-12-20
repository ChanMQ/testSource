// import '@babel/polyfill'

const baseConfig = {
    gender: 'femail'
}

console.log(...combineConf({
    name: '晨晨',
    cats: 2
}))


function combineConf(obj) {
    return Object.assign({}, obj, baseConfig)
}

// async function test() {
//     await console.log('heheheh')
// }