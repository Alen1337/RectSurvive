const Input = require("../Input/Server")
const GO = require("../GameObject/Server")

function update(id) {

    if (!Object.hasOwnProperty.call(GO.getGameObjects(), id)) return



    let gameObjects = GO.getGameObjects()
    gameObjects[id].velocity.x = 0
    gameObjects[id].velocity.y = 0

    let inputArray = Input.getActiveInputs()
    
    for (let i = 0; i < inputArray.length; i++) {
        const el = inputArray[i];
        if(el.key === 'd') {
            gameObjects[id].velocity.x = 3
        }
        if(el.key === 'a') {
            gameObjects[id].velocity.x = -3
        }
        if(el.key === 's') {
            gameObjects[id].velocity.y = 3
        }
        if(el.key === 'w') {
            gameObjects[id].velocity.y = -3
        }
    }

}

module.exports = {
    update
}