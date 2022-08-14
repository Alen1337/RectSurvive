const app = require("../HTML/Server").app
const expressWs = require('express-ws')(app);
const WSInGame = expressWs.getWss("/game")
const GO = require("../../GameObject/Server")
const Input = require("../../Input/Server")
const Movement = require("../../Movement/Server")
const Raycast = require("../../Raycast/Server")
const WeaponSystem = require('../../WeaponSystem/Server')
const HealthSystem = require("../../HealthSystem/Server")

WeaponSystem.start(sendBroadcast)
HealthSystem.start(sendBroadcast)

console.log("Websocket server started!")

app.ws("/game", (ws, req) => {
    let obj = GO.createPlayerObject()
    let objID = obj.id
    
    ws._rect = {
        gameObject: obj,
        id: objID
    }

    ws.send(JSON.stringify({
        type: "playerObject",
        id: objID,
        object: obj
    }))

    GO.getGameObjects().forEach(element => {
        if(element.id === objID) return
        let msg = {
            type: "addObject",
            id: element.id,
            object: element
        }
        ws.send(JSON.stringify(msg))
    });
    
    let msg = {
        type: "addObject",
        id: objID,
        object: obj
    }
    sendBroadcast("/game", msg, 'toEveryone')

    console.log("Client connected! Client ObjectID: ", objID);
   
    ws.on('message', (data) => {
        let msg = JSON.parse(data) 

        if(msg.type === "activeInputs") {
            Input.update(msg.activeInputs)
            Movement.update(objID)
            WeaponSystem.update(objID)
        }

        if(msg.type === "ping") {
            ws.send(JSON.stringify({
                type: "ping"
            }))
        }
    })

    ws.on('close', () => {
        console.log("Client disconected! ID: ", objID)
        GO.removeObject(objID)

        let msg = {
            type: "removeObject",
            id: objID,
        }
        sendBroadcast("/game", msg, 'toEveryone')
    })
})

function sendBroadcast(route, msg, mode, sender) {
    if(mode === 'toEveryone'){
        if(route === "/game") {
            WSInGame.clients.forEach((client) => {
                client.send(JSON.stringify(msg))
            })
        }
    }
    else if(mode === 'toClient') {
        WSInGame.clients.forEach((client) => {
            if(client._rect.id === sender.id) {
                client.send(JSON.stringify(msg))
            }
        })
    }
    
}

module.exports = {
    sendBroadcast,
}