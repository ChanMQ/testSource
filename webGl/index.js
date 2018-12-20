// !function(win, doc) {
    const canvas = document.getElementById('canvas'),
        gl = canvas.getContext('webgl')
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    window.test = {
        canvas,
        gl
    }
// }(window, document)