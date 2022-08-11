const Input = require("../Input/Server")
const GO = require("../GameObject/Server")
const BC = require("../Network/WebSocket/Server")


let onBroadcast

function start(_onBroadcast) {
    onBroadcast = _onBroadcast
}

function update(id) {
    if (!Object.hasOwnProperty.call(GO.getGameObjects(), id)) return
    
    let gameObjects = GO.getGameObjects()

    let inputArray = Input.getActiveInputs()
    
    for (let i = 0; i < inputArray.length; i++) {
        const el = inputArray[i];
        if(el.key === 0) {
            shot(id, gameObjects[id], el.x, el.y)
        }
    }
}

function shot(senderID, sender, clickX, clickY) {

    let gameObjects = GO.getGameObjects()

    let dxTarget = clickX - sender.position.x
    let dyTarget = clickY - sender.position.y
    let magnTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget)

    let normX = dxTarget / magnTarget
    let normY = dyTarget / magnTarget

    let startX = sender.position.x
    let startY = sender.position.y 
    let endX = sender.position.x + normX * 400
    let endY = sender.position.y + normY * 400
    
    let hittedObjID = undefined


    for (const key in GO.getGameObjects()) {
        if (Object.hasOwnProperty.call(GO.getGameObjects(), key)) {
            const go = GO.getGameObjects()[key];
        
            let rx = go.position.x
            let ry = go.position.y
            let rw = go.position.w
            let rh = go.position.h

            let left = linesCollison(startX, startY, endX, endY,    rx,ry,rx, ry+rh)
            let right = linesCollison(startX, startY, endX, endY,   rx+rw,ry, rx+rw,ry+rh)
            let top = linesCollison(startX, startY, endX, endY,     rx,ry, rx+rw,ry)
            let bottom = linesCollison(startX, startY, endX, endY,  rx,ry+rh, rx+rw,ry+rh)
            
            if(left || right || top || bottom) {
                hittedObjID = index
            }
        }
    }


    let msg = {
        type: "shot",
        hittedObjID: hittedObjID,
        position: {
            x1: startX,
            x2: endX,
            y1: startY,
            y2: endY
        }
    }

    onBroadcast("/game", msg)
    
}

function linesCollison(x1, y1, x2, y2, x3, y3, x4, y4) {
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) return true
    return false
}

module.exports = {
    update,
    start
}