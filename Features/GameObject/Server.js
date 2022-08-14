const Weapon = require('../Weapons/Server').Weapon

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

function createPlayerObject() {
    let objID = _objID++
    let newObject = {
        type: 'playerObject',
        id: objID,
        position: {
            x: 300,
            y: 300
        },
        velocity: {
            x: 0,
            y: 0
        },
        size: {
            w: 50,
            h: 50,
        },
        stats: {
            currentHealth: 100,
            maxHealth: 100,
        },
        weapons: [Weapon.Pistol, Weapon.Rilfe, Weapon.Knife],
        selectedWeaponID: 0
    }

    _gameObjects[objID] = newObject

    console.log("PlayerObject Created! ID: ", objID)

    return newObject
}

function createWorldObject(px, py, vx, vy, sw, sh) {
    let objID = _objID++
    let newObject = {
        type: 'worldObject',
        id: objID,
        position: {
            x: px,
            y: py
        },
        velocity: {
            x: vx,
            y: vy
        },
        size: {
            w: sw,
            h: sh,
        }
    }

    _gameObjects[objID] = newObject

    console.log("WorldObject Created! ID: ", objID)

    return newObject
}

function removeObject(objID) {
    
    if(!Object.hasOwnProperty.call(_gameObjects, objID)) {
        return
    }
    delete _gameObjects[objID]

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
    getGameObjects, 
    createPlayerObject,
    createWorldObject
}