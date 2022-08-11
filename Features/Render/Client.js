import * as GO from "/GameObject.js"
import * as Main from "/main.js"
import * as Raycast from "/Raycast.js"

let ctx
let w
let h 

export function start() {
    ctx = Main.getCTX()
}

export function setWindowSize(_w, _h) {
    w = _w
    h = _h
}

export function update() {
    let gameObjects = GO.getGameObjects()
    ctx.fillStyle = "#912f2f";
    ctx.fillRect(0,0, w, h)

    gameObjects.forEach(gameobject => {
        let go = gameobject
        ctx.fillStyle = "#00ff48";
        ctx.fillRect(go.position.x, go.position.y, go.size.w, go.size.h)
        ctx.fillText(go.id, go.position.x, go.position.y)
    });

    for(let id in gameObjects) {
        let go = gameObjects[id]
        ctx.fillStyle = "#91812f";
        ctx.fillRect(go.position.x, go.position.y, go.size.w, go.size.h)
    }

    Raycast.update()
}