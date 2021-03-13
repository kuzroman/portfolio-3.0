export default class Audio {
  // audio = document.createElement('audio')

  constructor(media, volume = 1) {
    this.audio = document.createElement('audio')
    document.body.appendChild(this.audio)
    this.audio.src = media
    this.audio.setAttribute('preload', 'auto')
    this.audio.setAttribute('controls', 'none')
    this.audio.style.display = 'none'
    this.audio.volume = volume
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
}
