import { createRoomState } from "./state-manager.js"

const rooms = new Map()

export function joinRoom(roomId, userId) {
  if (!rooms.has(roomId)) rooms.set(roomId, createRoomState())
  rooms.get(roomId).users.add(userId)
}

export function leaveRoom(roomId, userId) {
  const room = rooms.get(roomId)
  if (!room) return
  room.users.delete(userId)
}

export function getRoomState(roomId) {
  return rooms.get(roomId)
}

export function addStroke(roomId, stroke) {
  rooms.get(roomId).strokes.push(stroke)
}

export function clearCanvas(roomId) {
  const room = rooms.get(roomId)
  room.strokes = []
  return room
}
