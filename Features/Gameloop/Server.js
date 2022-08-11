const GO = require("../GameObject/Server")
const BC = require("../Network/WebSocket/Server")
function start() {
    setInterval(update, 0)
}

function update() {
    updatePosition();
}


function updatePosition() {
    let deltaTime = 1;
    let startTime = Date.now()
    let gameObjects = GO.getGameObjects()
    for(let id in gameObjects) {
        if(gameObjects[id] === undefined) continue
        let go = gameObjects[id]
        go.position.x += go.velocity.x * deltaTime
        go.position.y += go.velocity.y * deltaTime

        let msg = {
            type: "positionUpdate",
            id: id,
            position: gameObjects[id].position
        }
        BC.sendBroadcast("/game", msg)
    }
    deltaTime = Date.now() - startTime
}

module.exports = {
    start
}