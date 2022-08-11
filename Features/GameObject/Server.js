let _objID = 0;
let _gameObjects = []

function createObject() {
    let objID = _objID++
    let newObject = {
        id: objID,
        position: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        },
        size: {
            w: 50,
            h: 50,
        }
    }

    _gameObjects[objID] = newObject

    console.log("Object Created! ID: ", objID)

    return newObject
}

function removeObject(objID) {
    if(!_gameObjects.hasOwnProperty(objID)) {
        return
    }

    delete _gameObjects[objID]

    _gameObjects = _gameObjects.filter((value, index) => {
        return index !== objID
    })
}

function getObject(id) {
    if(!_gameObjects.hasOwnProperty(id)) {
        return false
    }
    return _gameObjects[id]
}

function getObjectCopy(id) {
    return JSON.parse(JSON.stringify(getObject(id)))
}

function getGameObjects() {
    return _gameObjects
}

module.exports = {
    createObject,
    removeObject,
    getObject,
    getObjectCopy,
    getGameObjects
}