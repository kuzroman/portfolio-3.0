export default class Canvas {
  #canvasBg = '#2f2f2f'

  constructor(canvas) {
    this.ctx = canvas.getContext('2d')
  }

  drawRect(x, y, size, color) {
    this.ctx.fillStyle = color || '#fff'
    this.ctx.fillRect(x, y, size, size)
  }

  clearCanvas(viewPortWidth, viewPortHeight) {
    this.ctx.fillStyle = this.#canvasBg
    this.ctx.fillRect(0, 0, viewPortWidth, viewPortHeight)
  }
}
