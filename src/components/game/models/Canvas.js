export default class Canvas {
  #canvasBg = '#2f2f2f'

  constructor(canvas) {
    this.ctx = canvas.getContext('2d')
  }

  drawRect(circle, color) {
    this.ctx.fillStyle = color || '#fff'
    this.ctx.fillRect(circle.x, circle.y, circle.size, circle.size)
  }

  clearCanvas(viewPortWidth, viewPortHeight) {
    this.ctx.fillStyle = this.#canvasBg
    this.ctx.fillRect(0, 0, viewPortWidth, viewPortHeight)
  }
}
