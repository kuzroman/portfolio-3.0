<template>
  <UiSoundBar
    class="sound-bar"
    :isActive="isActive"
    @click.native="switchPlayPause"
  />
</template>

<script>
import UiSoundBar from './UI/_SoundBar.vue'
import backgroundMusic from '../static/media/background.mp3'
import Audio from './abstractions/Audio'

export default {
  name: 'SoundBar',
  components: { UiSoundBar },
  data() {
    return {
      audio: new Audio(backgroundMusic),
      isActive: false,
    }
  },
  methods: {
    switchPlayPause() {
      if (this.audio.isPlaying()) {
        this.audio.pause()
        this.isActive = false
      } else {
        this.audio.play()
        this.isActive = true
      }
    },
  },
}
</script>

<style lang="scss">
.sound-bar {
  position: absolute;
  top: 1.6em;
  right: 10em;
}
</style>
