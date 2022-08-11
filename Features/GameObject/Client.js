let _gameObjects = []

export function createObject(msg) {
    let objID = msg.id
    let newObject = {
        id: msg.id,
        position: {
            x: msg.object.position.x,
            y: msg.object.position.y,
        },
        velocity: {
            x: msg.object.velocity.x,
            y: msg.object.velocity.y,
        },
        size: {
            w: msg.object.size.w,
            h: msg.object.size.h,
        }
    }

    _gameObjects[objID] = newObject

    console.log("Object Created! ID: ", objID)

    return newObject
}

export function removeObject(objID) {
    if(!_gameObjects.hasOwnProperty(objID)) {
        return
    }

    _gameObjects[objID] = null
    _gameObjects = _gameObjects.filter((value) => {
        return value !== null
    })
    console.log("Removing objectID: ", objID)
}

export function getObject(id) {
    if(!_gameObjects.hasOwnProperty(id)) {
        return false
    }
    return _gameObjects[id]
}

export function getObjectCopy(id) {
    return JSON.parse(JSON.stringify(getObject(id)))
}

export function getGameObjects() {
    return _gameObjects
}