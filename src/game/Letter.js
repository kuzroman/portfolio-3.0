export default class Letter {
  constructor(el, rect) {
    const left = Math.trunc(rect.left) + window.scrollX
    const top = Math.trunc(rect.top) + window.scrollY

    this.el = el
    this.killed = false
    this.x1 = left
    // this.x2 = left + el.scrollWidth
    this.y1 = top
    // this.y2 = top + el.scrollHeight
  }
}
