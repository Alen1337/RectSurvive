const Input = require("../Input/Server")
const GO = require("../GameObject/Server")
const BC = require("../Network/WebSocket/Server")

let hits = []
let otherID

function create(sender, clickX, clickY, distance) {
    let hittedObjID = undefined
    hits = []

    let dxTarget = clickX - (sender.position.x + sender.size.w/2)
    let dyTarget =  clickY - (sender.position.y + sender.size.h/2)
    let magnTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget)

    let normX = dxTarget / magnTarget
    let normY = dyTarget / magnTarget

    let startX = sender.position.x + sender.size.w/2
    let startY = sender.position.y + sender.size.h/2
    let endX = sender.position.x + sender.size.w/2 + normX * distance
    let endY = sender.position.y + sender.size.h/2 + normY * distance

    for (const key in GO.getGameObjects()) {
        if (Object.hasOwnProperty.call(GO.getGameObjects(), key)) {
            const go = GO.getGameObjects()[key];
            otherID = key
            if(go.id === sender.id) continue
            let rx = go.position.x
            let ry = go.position.y
            let rw = go.size.w
            let rh = go.size.h

            let left = linesCollison(startX, startY, endX, endY,    rx,ry,rx, ry+rh)
            let right = linesCollison(startX, startY, endX, endY,   rx+rw,ry, rx+rw,ry+rh)
            let top = linesCollison(startX, startY, endX, endY,     rx,ry, rx+rw,ry)
            let bottom = linesCollison(startX, startY, endX, endY,  rx,ry+rh, rx+rw,ry+rh)
            
            if(left || right || top || bottom) {
                hittedObjID = otherID
            }
        }
    }
    return {
        startX,
        startY,
        endX,
        endY,
        hits,
        hittedObjID
    }
}

function linesCollison(x1, y1, x2, y2, x3, y3, x4, y4) {
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1)  {
        let hitX = x1 + (uA * (x2-x1));
        let hitY = y1 + (uA * (y2-y1));
        let hittedID = otherID
        hits.push({hitX, hitY, hittedID})
        return true
    }
    return false
}

module.exports = {
    create,
}