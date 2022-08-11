const app = require("../html/Server").app
const expressWs = require('express-ws')(app);
const WSInGame = expressWs.getWss("/game")
const GO = require("../../GameObject/Server")
const Input = require("../../Input/Server")
const Movement = require("../../Movement/Server")
const Raycast = require("../../Raycast/Server")

console.log("Websocket server started!")

Raycast.start(sendBroadcast)

app.ws("/game", (ws, req) => {
    let obj = GO.createObject()
    let objID = obj.id
    
    ws._rect = {
        gameObject: obj,
        id: objID
    }

    GO.getGameObjects().forEach(element => {
        if(element.id === objID) return
        let msg = {
            type: "addObject",
            id: element.id,
            object: element
        }
        
        //sendBroadcast("/game", msg)
        ws.send(JSON.stringify(msg))
    });
    
    let msg = {
        type: "addObject",
        id: objID,
        object: obj
    }
    sendBroadcast("/game", msg)

    console.log("Client connected! Client ObjectID: ", objID);
   
    ws.on('message', (data) => {
        let msg = JSON.parse(data) 

        if(msg.type === "activeInputs") {
            Input.update(msg.activeInputs)
            Movement.update(objID)
            Raycast.update(objID)
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
        sendBroadcast("/game", msg)
    })
})

function sendBroadcast(route, msg) {
    //console.log("Sending msg to client: ", msg)
    if(route === "/game") {
        WSInGame.clients.forEach((client) => {
            client.send(JSON.stringify(msg))
        })
    }
}

module.exports = {
    sendBroadcast,
}