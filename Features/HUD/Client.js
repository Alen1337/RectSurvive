import * as GO from "/GameObject.js"
import * as Main from "/main.js"
const hud = document.getElementById("hudContainer")
let ctx


export function start() {
    ctx = Main.getCTX()
    
}

export function update() {
    
}

export function render() {
    //hud.innerHTML = GO.getPlayerID()
    renderHUD()
}

function renderHUD() {
    let out = `
        ${renderHealthContainer()}
        ${renderWeaponSlotContainer()}
    `
    hud.innerHTML =  out
}

function renderHealthContainer() {
    return `
        <div class='health-container'>
            <div>
                Health: ${GO.getPlayerObject().stats.maxHealth} / ${GO.getPlayerObject().stats.currentHealth}
            </div>
        </div>
    `
}

function renderWeaponSlotContainer() {
    let weapons = ''
    GO.getPlayerObject().weapons.forEach(w => {
        if(w.weaponid === GO.getPlayerObject().selectedWeaponID) {
            weapons += `
            <div class="weapon-slot-selected"> 
                <p>${w.name}</p>
            </div>
            ` 
            return
        }
        weapons += `
        <div class="weapon-slot"> 
            <p>${w.name}</p>
        </div>
        `
    });

    return `
        <div class='weapon-slot-container'>
            ${weapons}
        </div>
    `
}