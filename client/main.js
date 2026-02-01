import { setupCanvas, drawStroke, clear } from "./canvas.js"
import { socket, join, sendStroke, sendUndo } from "./websocket.js"

const canvas = document.getElementById("canvas")
const ctx = setupCanvas(canvas)
const undoBtn = document.getElementById("undo")
const roomId = "global"

let drawing = false
let currentStroke = null
let canUndo = false

join(roomId)

canvas.addEventListener("mousedown", e => {
  drawing = true
  currentStroke = {
    points: [pos(e)],
    color: "#F5F5F5",
    width: 4
  }
})

canvas.addEventListener("mousemove", e => {
  if (!drawing) return
  const p = pos(e)
  currentStroke.points.push(p)
  drawStroke(ctx, {
    points: currentStroke.points.slice(-2),
    color: currentStroke.color,
    width: currentStroke.width
  })
})

window.addEventListener("mouseup", () => {
  if (!drawing) return
  drawing = false
  sendStroke(roomId, currentStroke)
  currentStroke = null
  canUndo = true
  undoBtn.disabled = false
})

undoBtn.onclick = () => {
  if (!canUndo) return
  sendUndo(roomId)
}

window.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "z") {
    if (canUndo) sendUndo(roomId)
  }
})

socket.on("draw", stroke => drawStroke(ctx, stroke))

socket.on("init_state", state => {
  clear(ctx, canvas)
  state.strokes.forEach(s => drawStroke(ctx, s))
})

socket.on("sync_state", state => {
  clear(ctx, canvas)
  state.strokes.forEach(s => drawStroke(ctx, s))
  undoBtn.disabled = true
})



function pos(e) {
  const r = canvas.getBoundingClientRect()
  return {
    x: e.clientX - r.left,
    y: e.clientY - r.top
  }
}

