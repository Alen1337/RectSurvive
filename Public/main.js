import * as Input from "/Input.js"
import * as GameLoop from "/GameLoop.js"
import * as GO from "/GameObject.js"
import * as Render from "/Render.js"
import * as WSS from "/WebSocket.js"
import * as WeaponSystem from "/WeaponSystem.js"
import * as Particles from "/Particles.js"

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
            console.log(msg)
        }
        else if(msg.type === "positionUpdate") {
            if(GO.getObject(msg.id)) GO.getObject(msg.id).position = msg.position
        }
        else if(msg.type === "shot") {
            if(msg.hittedObjID) console.log("Hitted OBJ: ", GO.getObject(msg.hittedObjID))
            //shots.push(msg)
            WeaponSystem.addShot(msg.ray)
        } else if(msg.type === "removeObject") {
            GO.removeObject(msg.id)
            console.log(GO.getGameObjects())
        }
        else if(msg.type === 'playerObject') {
            GO.setPlayerID(msg.id)
        }
        else if(msg.type === 'weaponChange') {
            GO.getPlayerObject().selectedWeaponID = msg.selectedWeaponID
        } else if(msg.type === 'healthChange') {
            GO.getPlayerObject().stats.currentHealth = msg.currentHealth
        }
    })

    WSS.getWSS().addEventListener('open', (event) => {
        Render.start()
        WeaponSystem.start()
        GameLoop.start()
        Particles.start()
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
    window.addEventListener('wheel', (event) =>{
        Input.update(event)
    })

    window.oncontextmenu = (e) => {
        e.preventDefault()
    }

    Render.setWindowSize(width, height)
}






window.onload = init