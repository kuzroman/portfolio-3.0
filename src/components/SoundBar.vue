<template>
  <UiSoundBar
    class="sound-bar"
    :isActive="isActive"
    @click.native="switchPlayPause"
  />
</template>

<script>
import UiSoundBar from './UI/SoundBar.vue'
import backgroundMusic from '../assets/media/backgroundSite.mp3'
import CustomAudio from './abstractions/Audio'
const audioBG = new CustomAudio(backgroundMusic)

export default {
  name: 'SoundBar',
  components: { UiSoundBar },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    switchPlayPause() {
      if (audioBG.isPlaying()) {
        audioBG.pause()
        this.isActive = false
      } else {
        audioBG.play()
        this.isActive = true
      }
    },
  },
  destroyed() {
    audioBG.destroy()
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
