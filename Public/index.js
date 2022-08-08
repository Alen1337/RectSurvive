let canvas
let ctx

let width = window.innerWidth
let height = window.innerHeight
let isRunning = false

function init() {
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    
    ctx.canvas.width  = width
    ctx.canvas.height = height
    
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0, width, height)

    canvas.addEventListener('keydown', (event) => {
        getInput(event)
    })
    canvas.addEventListener('keyup', (event) => {
        getInput(event)
    })
    canvas.addEventListener('click', (event) => {
        getInput(event)
    })


    main()
}

function main() {
    isRunning = true
    while(isRunning) {
        
    }
}

function getInput(e) {
    if(e.type === 'click') console.log("klikk ezzel: ", e.key)
}

function update() {

}

function render() {

}








window.onload = init