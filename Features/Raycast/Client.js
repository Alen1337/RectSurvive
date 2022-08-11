import * as Main from "/main.js"

let shots = []
let ctx
export function start() {
    ctx = Main.getCTX()
}

export function addShot(shot) {
    shots.push(shot)
}

export function update() {
    for (let i = 0; i < shots.length; i++) {
        const s = shots[i]
        ctx.fillStyle = "#03f0fc";
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();
    }
}