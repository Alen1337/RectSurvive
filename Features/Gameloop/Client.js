import * as Render from "/Render.js"

let deltaTime = 0

export function start() {
    setInterval(update, 0)
}

function update() {
    let timeA = Date.now();

    Render.update()

    deltaTime = Date.now() - timeA;
    let FPS = 1000.0 / deltaTime

    //console.log("FPS: ", FPS.toFixed(2), " FrameTime: ", deltaTime.toFixed(2), "ms")
}