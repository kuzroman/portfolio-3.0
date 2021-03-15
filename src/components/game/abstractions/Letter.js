export default class Letter {
  isShow = false
  x1 = 0
  x2 = 0
  y1 = 0
  y2 = 0

  constructor(letter, i) {
    this.id = i
    this.sign = letter === ' ' ? '-' : letter
    this.isKilled = letter === ' ' || letter === '|'
  }

  setPosition(letter) {
    this.x1 = letter.x1
    this.x2 = letter.x2
    this.y1 = letter.y1
    this.y2 = letter.y2
  }

  show() {
    this.isShow = true
  }
}
