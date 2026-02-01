export const socket = io()

export function join(roomId) {
  socket.emit("join", roomId)
}

export function sendStroke(roomId, stroke) {
  socket.emit("draw", { roomId, stroke })
}

export function sendUndo(roomId) {
  socket.emit("undo", roomId)
}
