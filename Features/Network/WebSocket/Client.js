let wss

export function init(route) {
    wss = new WebSocket("ws://localhost:6634" + route )
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