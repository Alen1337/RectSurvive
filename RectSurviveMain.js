const app = require("./Features/Network/html/Server").app
const GameLoop = require("./Features/Gameloop/Server")
const WebSocketServer = require("./Features/Network/WebSocket/Server")

GameLoop.start()

const server = app.listen(6634, () => {
    console.log("Server started")
})