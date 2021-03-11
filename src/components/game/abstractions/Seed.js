const getRandomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export default class Seed {
  #ground = 1500
  #gravityX = getRandomInRange(1, 5)
  #gravityY = getRandomInRange(1, 5)
  #speed = getRandomInRange(2, 5) / 10
  #bounceNum = 0
  #maxBounceNum = 5
  #revert = false

  constructor(x1, y1, type = 'default') {
    this.x = x1 || 0
    this.y = y1 || 0
    this.size = getRandomInRange(1, 3)
    this.isStopped = false
    this.direction = Math.random() < 0.6 ? 1 : -1
    this.type = type // default || shrapnel
  }

  update(barrier) {
    this.type === 'shrapnel'
      ? this._updateShrapnel()
      : this._updateSeed(barrier)
  }

  _updateSeed(barrier) {
    if (this._isBarrier(barrier)) {
      this.#revert = true
      this.#bounceNum += 1
    }
    if (this.#gravityY < 0) {
      this.#revert = false
    }

    if (this._isBounceLimitReached() || this._isUnderGround()) {
      this.isStopped = true
      return
    }

    this._move()
  }

  _updateShrapnel() {
    // if (this._isPlayer(player)) {
    //   this.y = this.#ground
    //   this.isStopped = true
    // }

    if (this._isUnderGround()) {
      this.isStopped = true
      return
    }

    this._fallDown(this.direction)
  }

  // _isPlayer(player) {}

  _isBounceLimitReached() {
    return this.#maxBounceNum < this.#bounceNum
  }

  _isUnderGround() {
    return this.#ground < this.y
  }

  _isBarrier(barrier) {
    if (!barrier) return false
    return this.y >= barrier.y && barrier.xFrom < this.x && this.x < barrier.xTo
  }

  _move() {
    if (this.#revert) {
      this._fallUp()
    } else this._fallDown()
  }

  _fallDown(direction = 1) {
    this._moveX(direction)
    this.y += Math.round(this.#gravityY)
    this.#gravityY = Math.round((this.#gravityY + this.#speed) * 100) / 100
  }

  _fallUp(direction = 1) {
    this._moveX(direction)
    this.y -= Math.round(this.#gravityY)
    this.#gravityY = Math.round((this.#gravityY - 1) * 100) / 100
  }

  _moveX(direction = 1) {
    this.x += direction * Math.round(this.#gravityX / 7)
    this.#gravityX = Math.round((this.#gravityX + this.#speed) * 100) / 100
  }
}
