const getRandomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export default class Bullet {
  #gravityY = getRandomInRange(5, 10)
  #ground = -100

  constructor(x, y, size) {
    this.x = x
    this.y = y || 500
    this.size = size || 15
    this.isStopped = false
  }

  updateBullet() {
    if (this._isOverScreen()) {
      this.isStopped = true
      return
    }

    this._move()
  }

  _move() {
    this._moveY()
  }

  _moveY() {
    this.y -= Math.round(this.#gravityY)
  }

  _isOverScreen() {
    return this.y < this.#ground
  }
}
