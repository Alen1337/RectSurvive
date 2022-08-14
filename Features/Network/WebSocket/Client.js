let wss

export function init(route) {
    wss = new WebSocket("ws://100.67.59.199:6634" + route )
}

export function getWSS() {
    return wss
}


export function sendInput(input) {
    wss.send(JSON.stringify({
        type: "activeInputs",
        activeInputs: input
        
    }))
}