module.exports = {
    first({ types: t }) {
        return {
            visitor: {
                BinaryExpression(path) {
                    if (path.node.operator !== "===") {
                      return;
                    }
                  
                    path.node.left = t.identifier("1");
                    path.node.right = t.identifier("2");
                }
            }
        }
    },
    second({ types: t }) {
        return {
            visitor: {
                BinaryExpression(path) {
                    if (path.node.operator !== "===") {
                      return;
                    }
                  
                    path.node.left = t.identifier("3");
                    path.node.right = t.identifier("4");
                }
            }
        }
    }
}