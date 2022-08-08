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
        console.log(err)
    })
})

app.get("/index.js", (req, res) => {
    fs.readFile("Public/index.js", (err, data) => {
        res.setHeader("Content-Type", "application/javascript");
        res.end(data)
        console.log(err)
    })
})

const server = app.listen(6634, () => {
    console.log("Server started")
})