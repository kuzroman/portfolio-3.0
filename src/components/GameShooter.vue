<template>
  <div class="shooter">
    <div id="lettersRoot" class="letters">
      <div></div>
    </div>
    <canvas id="canvas"></canvas>
    <ButtonPlay v-on:mounted-button-play="setBarrier" />
    <DebugInput v-if="isDebug" :seeds="seeds" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Seed from '../game/Seed.js'
import Letter from '../game/Letter.js'
import ButtonPlay from './game/ButtonPlay.vue'
import DebugInput from './game/DebugInput.vue'
let intervalLetters, intervalSeed

const eventBus = new Vue()
let canvas = HTMLElement || null
let ctx = HTMLElement || null

export default {
  name: 'GameShooter',
  components: { ButtonPlay, DebugInput },
  data() {
    return {
      width: Number || 0,
      height: Number || 0,
      seeds: [],
      seedsForLetter: 3,
      isSeedsFell: false,
      letters: [],
      SeedSpeed: 15,
      letterSpeed: 10,
      isAnimStarted: false,
      isPaused: false,
      isDebug: false,
      canvasBg: '#2f2f2f',
      barrier: null,
    }
  },
  computed: {
    ...mapGetters(['isPageLoaderHide']),

    description() {
      return this.isDebug
        ? 'A'
        : `Hello, my name is Roman.
          I am a web Front-End developer and UI enthusiast.
          SPA, animation, Vue.js, are my passion
          Check this out some projects on my Work page.
          Feel free if you want say hello at kuzroman@list.ru then do it!)`
    },
  },
  methods: {
    setBarrier(barrier) {
      this.barrier = barrier
    },
    addText() {
      let el
      this.box.innerHTML = ''
      ;[...this.description].forEach((letter) => {
        el = document.createElement('i')
        el.innerText = letter
        el.className = 'hide'
        this.box.append(el)
      })
    },
    showText() {
      let i = 0,
        letters = this.letters

      intervalLetters = setInterval(() => {
        // draw letters
        if (i <= letters.length - 1) {
          this.showLetter(letters[i])
        }
        if (this.isSeedsFell) clearInterval(intervalLetters)
        i++
      }, this.letterSpeed)
    },
    showLetter(letter) {
      letter['el'].style.opacity = 1
      eventBus.$emit('showSeed', { x: letter.x1, y: letter.y1 })
    },
    createLetters() {
      let objList = []
      this.lettersRoot.querySelectorAll('i').forEach((el) => {
        let rect = el.getBoundingClientRect()
        let letter = new Letter(el, rect)
        objList.push(letter)
      })
      return objList
    },
    addSeed(positions) {
      for (let i = 0; i < this.seedsForLetter; i++) {
        let seed = new Seed(positions.x, positions.y)
        this.seeds.push(seed)
      }
    },
    animationSeeds() {
      intervalSeed = setInterval(() => {
        if (this.isSeedsFell) clearInterval(intervalSeed)

        if (this.isPaused) return
        this.clearCanvas()
        this.updateSeeds()
      }, this.SeedSpeed)
    },
    drawSeed(seed) {
      ctx.fillStyle = '#fff'
      ctx.fillRect(seed.x, seed.y, seed.size, seed.size)
    },
    clearCanvas() {
      ctx.fillStyle = this.canvasBg
      ctx.fillRect(0, 0, this.width, this.height)
    },
    updateSeeds() {
      this.seeds = this.seeds.filter((seed) => {
        seed.updateSeed(this.barrier)
        this.drawSeed(seed)
        return !seed.isStopped
      })

      if (!this.seeds.length) {
        this.isSeedsFell = true
      }
    },
    pause() {
      this.isPaused = !this.isPaused
    },
    setPauseKey(key) {
      const keyName = key || 'Space'
      document.body.addEventListener('keydown', (ev) => {
        if (ev.code === keyName) {
          this.pause()
        }
      })
      document.body.focus()
    },
    createCanvas() {
      // method should run after mounted!
      this.width = window.innerWidth
      this.height = window.innerHeight
      canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d')

      this.lettersRoot = document.querySelector('#lettersRoot')
      this.box = this.lettersRoot.querySelector('div')

      eventBus.$on('showSeed', (positions) => {
        this.addSeed(positions)
        if (!this.isAnimStarted) {
          this.isAnimStarted = true
          this.animationSeeds()
        }
      })

      canvas.width = this.width
      canvas.height = this.height
    },
    writeLetters() {
      this.createCanvas()

      setTimeout(() => {
        this.addText()
        this.letters = this.createLetters()
        this.showText()
      }, 500)
    },
  },
  watch: {
    isPageLoaderHide() {
      this.writeLetters()
    },
  },
  created() {
    if (this.isDebug) this.setPauseKey('Space')
  },
  mounted() {
    if (this.isPageLoaderHide) {
      this.writeLetters()
    }
  },
  destroyed() {
    clearInterval(intervalLetters)
    clearInterval(intervalSeed)
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.shooter {
  & .letters {
    width: 600px;
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -300px;
    color: #fff;
    z-index: 1;

    & .hide {
      opacity: 0;
    }
  }

  & #canvas {
    position: absolute;
    top: 0;
    left: 0;
    background: $bg-10;
  }
}
</style>
