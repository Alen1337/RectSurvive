let _gameObjects = []
let _playerID = undefined

export function createObject(msg) {
    let objID = msg.id
    let newObject = msg.object

    _gameObjects[objID] = newObject

    return newObject
}

export function setPlayerID(playerID) {
    _playerID = playerID
}

export function getPlayerID() {
    return _playerID
}

export function getPlayerObject() {
    return _gameObjects[_playerID]
}

export function removeObject(objID) {
    if(!_gameObjects.hasOwnProperty(objID)) {
        return
    }

    delete _gameObjects[objID]
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