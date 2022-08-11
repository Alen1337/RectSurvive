import * as WSS from "/WebSocket.js"
let _activeInputs = []



export function update(e) {
    let constains = false
    _activeInputs.forEach(el => {
        if(el.key === e.key || el.key === e.button) {
            constains = true
        }
    })
    if(e.type === 'keydown' && !constains) {
        _activeInputs.push({key: e.key})
        WSS.sendInput(_activeInputs)
        
    }
    if(e.type === 'mousedown' && !constains) {
        _activeInputs.push({key: e.button, x: e.clientX, y: e.clientY})
        WSS.sendInput(_activeInputs)
    }
    
    if(e.type === 'keyup') {
        _activeInputs = _activeInputs.filter((value) => { return value.key !== e.key })
        WSS.sendInput(_activeInputs)
    }

    if(e.type === "mouseup") {
        _activeInputs = _activeInputs.filter((value) => { return value.key !== e.button })
        WSS.sendInput(_activeInputs)
    }
}

export function onLostFocus() {
    _activeInputs = []    
    WSS.sendInput(_activeInputs)
}