import * as Main from "/main.js"
import * as Particles from "/Particles.js"

let shots = []
let particles = []
let ctx
export function start() {
    ctx = Main.getCTX()
    setInterval(deleteShots, 25)
}


function deleteShots() {
    shots.forEach((s, i) => {
        if( Date.now() - s.date > 25) shots.splice(i,1)
    });
}

export function addShot(shot) {
    
    if(shot.hits.length !== 0) {
        let minDis = Number.MAX_SAFE_INTEGER
        let minHit = shot.hits[0]
        shot.hits.forEach(hit => {
            hit.dis = (shot.startX - hit.hitX)*(shot.startX - hit.hitX) + (shot.startY - hit.hitY)*(shot.startY - hit.hitY)
            if(hit.dis < minDis) {
                minDis = hit.dis
                minHit = hit
            }
        });
        shot.hits = []
        shot.hits.push(minHit)
        setupParticles(shot.hits[0])
    }
    shot.date = Date.now()
    shots.push(shot)
}

export function render() {
    for (let i = 0; i < shots.length; i++) {
        const s = shots[i]
        //renderHit(s)
        renderLine(s)
    }
}

function renderHit(s) {
    ctx.fillStyle = "orange"
    ctx.strokeStyle = 'orange';
    s.hits.forEach(hit => {
        let x = hit.hitX - 3
        let y = hit.hitY - 3
        let s = 6
        ctx.fillRect(x,y,s,s)
    });
}

function renderLine(s) {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(s.startX, s.startY);
    if(s.hits.length > 0 ) ctx.lineTo(s.hits[0].hitX, s.hits[0].hitY);
    else ctx.lineTo(s.endX, s.endY);
    ctx.stroke();
}

function setupParticles(hit) {
    let x = hit.hitX - 3
    let y = hit.hitY - 3
    let s = 6
    Particles.create('shot', 2000, x, y, s)
}