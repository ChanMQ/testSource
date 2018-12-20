const babel = require("@babel/core");

const resource = "let initNum = 123;"
const { ast } =  babel.transformSync(resource, {
    ast: true,
    code: false
})

// // 对 ast 内容进行转换
// console.log(ast)
// ast.program.body[0].kind === 'let' && (ast.program.body[0].kind = 'var')

const { code } = babel.transformFromAstSync(ast, resource, {})

console.log(code)
