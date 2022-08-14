const Weapons = require("../Weapons/Server").Weapons
const GO = require('../GameObject/Server')

let onBroadcast

function start(_onBroadcast) {
    onBroadcast = _onBroadcast
}

function update(sender, hittedObjID) {
    let hittedObject = GO.getObject(hittedObjID)
    
    hittedObject.stats.currentHealth -= Weapons[sender.selectedWeaponID].damage
    sendUpdate(hittedObject)
}

function sendUpdate(client) {
    let msg = {
        type: "healthChange",
        objID: client.id,
        currentHealth: client.stats.currentHealth
    }

    onBroadcast("/game", msg, 'toClient', client)
}


module.exports = {
    update,
    start
}