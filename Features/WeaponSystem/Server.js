const GO = require('../GameObject/Server')
const Raycast = require("../Raycast/Server")
const Input = require("../Input/Server")
const Weapons = require("../Weapons/Server").Weapons
const HealthSystem = require("../HealthSystem/Server")

let onBroadcast

function start(_onBroadcast) {
    onBroadcast = _onBroadcast
}

function update(objID) {
    let senderObject = GO.getObject(objID)
    if(!senderObject) {
        console.log("checkInput(objID) ERROR:  wrong objID")
        return
    }
    
    let inputArray = Input.getActiveInputs()
    
    for (let i = 0; i < inputArray.length; i++) {
        const el = inputArray[i];
        if(el.key === 0) {
            weaponShot(senderObject, el)
            
        }
        if(el.key === 2) {
            
        }
        if(el.key  === 'wheel') {
            changeWeapon(el, senderObject)
        }
    } 
}

function weaponShot(senderObject, el) {
    const w = Weapons[senderObject.selectedWeaponID]
    recoilShot(senderObject, el.x, el.y, w.accuracy, w.range)
}

function changeWeapon(el, senderObject) {
    if(el.deltaY === -100) {
        let sw = senderObject.selectedWeaponID + 1
        if(sw > senderObject.weapons.length-1) sw = 0
        senderObject.selectedWeaponID = sw
    }
    else if(el.deltaY === 100) {
        let sw = senderObject.selectedWeaponID -1
        if(sw < 0) sw = senderObject.weapons.length -1
        senderObject.selectedWeaponID = sw
    }
    broadcastWeaponChange(senderObject.id, senderObject.selectedWeaponID, senderObject)
}

function recoilShot(sender, clickX, clickY, accuracy, range) {
    const recoil = calcRecoil(sender, clickX, clickY, accuracy)
    const Ray = Raycast.create(sender, recoil.x, recoil.y, range)
    if(Ray.hittedObjID !== undefined && GO.getObject(Ray.hittedObjID).type === 'playerObject') HealthSystem.update(sender, Ray.hittedObjID)
    broadcastRay(Ray)
}


function calcRecoil(sender, clickX, clickY, accuracy) {
    let dxTarget = clickX - (sender.position.x + sender.size.w)
    let dyTarget =  clickY - (sender.position.y + sender.size.h)
    let magnTarget = (Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget)) * (Math.PI/180) / accuracy
    let min = -magnTarget 
    let max = magnTarget
    let r = (Math.random() * (max - min) + min).toFixed(2) 

    let s = Math.sin(r)
    let c = Math.cos(r)

    clickX -= sender.position.x
    clickY -= sender.position.y

    let nX = clickX * c - clickY * s
    let nY = clickX * s + clickY * c

    clickX = nX + sender.position.x
    clickY = nY + sender.position.y

    return {
        x: clickX,
        y: clickY
    }
}

function broadcastRay(Ray) {
    let msg = {
        type: "shot",
        ray: Ray
    }

    onBroadcast("/game", msg, 'toEveryone')
}

function broadcastWeaponChange(objID, selectedWeaponID, sender) {
    let msg = {
        type: "weaponChange",
        objID: objID,
        selectedWeaponID: selectedWeaponID
    }

    onBroadcast("/game", msg, 'toClient', sender)
}

module.exports = {
    start,
    update
}

