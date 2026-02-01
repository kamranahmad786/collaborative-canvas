export function setupCanvas(canvas) {
  const ctx = canvas.getContext("2d")
  resize(canvas, ctx)
  window.addEventListener("resize", () => resize(canvas, ctx))
  return ctx
}

function resize(canvas, ctx) {
  const ratio = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * ratio
  canvas.height = window.innerHeight * ratio
  canvas.style.width = window.innerWidth + "px"
  canvas.style.height = window.innerHeight + "px"
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
}

export function drawStroke(ctx, stroke) {
  const pts = stroke.points
  if (pts.length < 2) return
  ctx.strokeStyle = stroke.color
  ctx.lineWidth = stroke.width
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i].x, pts[i].y)
  }
  ctx.stroke()
}

export function clear(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}
