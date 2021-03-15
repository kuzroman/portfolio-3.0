export default class Audio {
  constructor(media, volume = 1, loop = false) {
    this.audio = document.createElement('audio')
    document.body.appendChild(this.audio)
    this.audio.src = media
    this.audio.setAttribute('preload', 'auto')
    this.audio.setAttribute('controls', 'none')
    this.audio.style.display = 'none'
    this.audio.volume = volume
    this.audio.loop = loop
  }

  isPlaying() {
    return this.audio.duration > 0 && !this.audio.paused
  }

  play(callback = () => {}) {
    this.audio.play().then((r) => callback(r))
  }

  pause() {
    this.audio.pause()
  }

  replay() {
    this.audio.currentTime = 0
    this.play()
  }

  destroy() {
    this.audio.remove()
  }
}
