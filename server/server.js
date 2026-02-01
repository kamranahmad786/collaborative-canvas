import express from "express"
import http from "http"
import { Server } from "socket.io"
import { joinRoom, leaveRoom, getRoomState, addStroke, clearCanvas } from "./rooms.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000

app.use(express.static("client"))

io.on("connection", socket => {
  socket.on("join", roomId => {
    joinRoom(roomId, socket.id)
    socket.join(roomId)
    socket.emit("init_state", getRoomState(roomId))
  })

  socket.on("draw", ({ roomId, stroke }) => {
    const fullStroke = { ...stroke, userId: socket.id }
    addStroke(roomId, fullStroke)
    socket.to(roomId).emit("draw", fullStroke)
  })

  socket.on("undo", roomId => {
    const state = clearCanvas(roomId)
    io.to(roomId).emit("sync_state", state)
  })

  socket.on("disconnecting", () => {
    for (const roomId of socket.rooms) {
      leaveRoom(roomId, socket.id)
    }
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
