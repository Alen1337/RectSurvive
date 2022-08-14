const GO = require('../GameObject/Server')



let World = [
    GO.createWorldObject(0,0,0,0,50,200)
]

function start() {
    World = [
        GO.createWorldObject(0,0,0,0,50,200)
    ]
}

function getWorldObjects() {
    return World
}

module.exports = {
    getWorldObjects,
    start
}


