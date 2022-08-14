const express = require('express')
const app = express()
const fs = require("fs")

app.get("/", (req, res) => {
    res.redirect("/game")
})

app.get("/game", (req, res) => {
    fs.readFile("Public/index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data)
    })
})

app.get("/main.js", (req, res) => {
    fs.readFile("Public/main.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})

app.get("/Input.js", (req, res) => {
    fs.readFile("Features/Input/Client.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})
app.get("/GameLoop.js", (req, res) => {
    fs.readFile("Features/GameLoop/Client.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})
app.get("/GameObject.js", (req, res) => {
    fs.readFile("Features/GameObject/Client.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})
app.get("/Render.js", (req, res) => {
    fs.readFile("Features/Render/Client.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})
app.get("/WebSocket.js", (req, res) => {
    fs.readFile("Features/Network/WebSocket/Client.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})
app.get("/Raycast.js", (req, res) => {
    fs.readFile("Features/Raycast/Client.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})
app.get("/WeaponSystem.js", (req, res) => {
    fs.readFile("Features/WeaponSystem/Client.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})
app.get("/Particles.js", (req, res) => {
    fs.readFile("Features/ParticlesSystem/Client.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})
app.get("/HUD.js", (req, res) => {
    fs.readFile("Features/HUD/Client.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
    })
})
app.get("/index.css", (req, res) => {
    fs.readFile("Public/index.css", (err, data) => {
        res.setHeader("Content-Type", "text/css");
        res.end(data)
    })
})

app.get("/style.css", (req, res) => {
    fs.readFile("Public/style.css", (err, data) => {
        res.setHeader("Content-Type", "text/css");
        res.end(data)
    })
})







module.exports = {app}