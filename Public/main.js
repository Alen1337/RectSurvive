import * as Input from "/Input.js"
import * as GameLoop from "/GameLoop.js"
import * as GO from "/GameObject.js"
import * as Render from "/Render.js"
import * as WSS from "/WebSocket.js"
import * as Raycast from "/Raycast.js"

let canvas
let ctx

let width = window.innerWidth
let height = window.innerHeight

let wss



export function getCTX() {
    return ctx
}


function init() {
    WSS.init("/game")

    WSS.getWSS().addEventListener('message', (event) => {
        let msg = JSON.parse(event.data)
        if(msg.type === "addObject") {
            GO.createObject(msg)
            console.log(GO.getGameObjects())
        }
        else if(msg.type === "positionUpdate") {
            if(GO.getObject(msg.id)) GO.getObject(msg.id).position = msg.position
        }
         else if(msg.type === "shot") {
            console.log(msg.hittedObjID)
            if(msg.hittedObjID) console.log(GO.getObject(msg.hittedObjID))
            //shots.push(msg)
            Raycast.addShot(msg.position)
        } else if(msg.type === "removeObject") {
            GO.removeObject(msg.id)
            console.log(GO.getGameObjects())
        }
    })

    WSS.getWSS().addEventListener('open', (event) => {
        Render.start()
        Raycast.start()
        GameLoop.start()
    })
    WSS.getWSS().addEventListener('close', () => {

    })


    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    
    ctx.canvas.width  = width
    ctx.canvas.height = height

    window.addEventListener('keydown', (event) => {
        Input.update(event)
    })
    window.addEventListener('keyup', (event) => {
        Input.update(event)
    })
    window.addEventListener('mousedown', (event) => {
        Input.update(event)
    })
    window.addEventListener('mouseup', (event) => {
        Input.update(event)
    })
    window.addEventListener('focus', (event) => {
        
    })
    window.addEventListener('blur', (event) => {
        Input.onLostFocus(event)
    })
    Render.setWindowSize(width, height)
}






window.onload = init