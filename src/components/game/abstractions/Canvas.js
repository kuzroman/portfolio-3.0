export default class Canvas {
  #canvasBg = '#2f2f2f'

  constructor(canvas) {
    this.ctx = canvas.getContext('2d')
  }

  drawRect(x, y, size, color) {
    this.ctx.fillStyle = color || '#fff'
    this.ctx.fillRect(x, y, size, size)
  }

  drawRing(x, y, size, color) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, size, 0, 2 * Math.PI)
    this.ctx.fillStyle = color
    this.ctx.fill()
  }

  clearCanvas(viewPortWidth, viewPortHeight) {
    this.ctx.fillStyle = this.#canvasBg
    this.ctx.fillRect(0, 0, viewPortWidth, viewPortHeight)
  }
}
