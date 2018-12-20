// 元素
const $canvas = document.getElementById('J-canvas'),
    $canvasCopy = document.getElementById('J-copy-canvas'),
    $saveBtn = document.getElementById('J-save-btn'),
    $resetBtn = document.getElementById('J-reset-btn'),
    $canvasContainer = document.getElementsByClassName('J-canvas-container')[0],
    $textGroups = document.getElementsByClassName('J-text-groups')[0]

// 参数
const ctx = $canvas.getContext('2d'),
    copyCtx = $canvasCopy.getContext('2d'),
    wid = $canvas.width,
    hei = $canvas.height

// 路劲
var imagePaths = ['/client/test.jpg']

drawImage(imagePaths[0], ctx)

// 文字组信息
const textGroups = {
    value: [], // [{ $text, pos: { x: 0, y: 0 } }]
    splice(text) {
        let index = textGroups.exists(text)

        if (index !== -1) {
            textGroups.value.splice(index, 1)
            text.$text.remove()
        }
    },
    push(text) {
        let index = textGroups.exists(text)

        if (index === -1) {
            textGroups.value.push(text)
        } 
    },
    exists(text) {
        let index = -1
        textGroups.value.some((item, i) => {
            if (item.$text === text.$text) {
                index = i

                return true
            }
        })

        return index
    }
}

// 保存时才进行最终的处理
$saveBtn.addEventListener('click', () => {
    copyCtx.clearRect(0, 0, wid, hei)

    copyCtx.fillStyle = '#fff'
    copyCtx.drawImage($canvas, 0, 0)
    textGroups.value.forEach(item => {
        copyCtx.fillText(item.$text.value, item.pos.x, item.pos.y)
    })
})

// dblclick 生成 .text 元素
$canvasContainer.addEventListener('dblclick', evt => {
    const pos = getComputedPos(evt)

    const $text = document.createElement('input')
        $text.className = 'text'
    
    $text.style.top = pos.y + 'px'
    $text.style.left = pos.x + 'px'
    $textGroups.appendChild($text)
    $text.focus()
    textGroups.push({
        $text,
        pos
    })
})

delegate($canvasContainer, 'dblclick', 'text', evt => {
    evt.stopPropagation()
})

delegate($canvasContainer, 'blur', 'text', evt => {
    evt.stopPropagation()

    let $target = evt.target, value = $target.value.trim()
    
    if (!value) {
        textGroups.splice({
            $text: $target
        })
    }
})

/**
 * @desc 画图
 * @param {*} src 
 * @param {*} canvasCtx 
 */
function drawImage(src, canvasCtx) {
    var img = new Image()

    img.src = src
    img.onload = () => {
        canvasCtx.drawImage(img, 0, 0, wid, hei)
    }
}

/**
 * @desc 点击的坐标在 $canvasContainer 中的位置
 */
function getComputedPos(evt) {
    let parentPos = $canvasContainer.getBoundingClientRect()

    return {
        x: evt.clientX - parentPos.left - 25,
        y: evt.clientY - parentPos.top - 10
    }
}

/**
 * @desc 简易版事件监听
 */
function delegate($parent, eventName, className, cb) {
    $parent.addEventListener(eventName, evt => {
        let $target = evt.target,
            classList = Array.prototype.slice.call($target.classList)
    
        if (!classList.includes(className)) return

        cb(evt)
    }, true)

    return delegate
}