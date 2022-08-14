import * as Main from "/main.js"

let particles = []
let ctx

export function start() {
    ctx = Main.getCTX()
}

export function update() {
    particles.forEach((p,i) => {
        if(p.s < 0 ||Date.now() - p.date > p.duration) {
            particles.splice(i,1)
            return
        }
        
        p.s -= 0.11
        let vx = 0.15
        let vy = 0.13
        if(i % 2 === 0) vx = -0.14
        if(i % 3 === 0) vy = -0.16
        if(i % 4 === 0) {
            vx = -0.12
            vy = -0.11
        }

        p.x += vx
        p.y += vy

    });
}

export function render() {
    particles.forEach((p,i) => {
        ctx.fillStyle = "orange"
        ctx.strokeStyle = 'orange';
        ctx.fillRect(p.x,p.y,p.s,p.s)
    });
}

export function create(type, duration, x, y, s) {
    let date = Date.now()
    if(type === 'shot') {
        for (let i = 0; i < 4; i++) {
            let posX = x - s
            let posY = y - s
            if(i === 1) posX = x
            if(i === 2) posY = y
            if(i === 3) {
                posX = x
                posY = y
            }
            particles.push({x,y,s,date,duration,type})
        }
    }
}