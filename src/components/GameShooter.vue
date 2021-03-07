<template>
  <div class="shooter">
    <div id="lettersRoot" class="letters"></div>
    <canvas id="canvas"></canvas>
    <ButtonPlay v-on:mounted-button-play="setBarrier" />
    <StatusBar />

    <DebugInput v-if="isDebug" :seeds="seeds" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Seed from '../game/Seed.js'
import Letter from '../game/Letter.js'
import ButtonPlay from './game/ButtonPlay.vue'
import DebugInput from './game/DebugInput.vue'
import StatusBar from './game/StatusBar.vue'

let intervalLetters, intervalSeed
let ctx = HTMLElement || null

export default {
  name: 'GameShooter',
  components: { ButtonPlay, DebugInput, StatusBar },
  data() {
    return {
      seeds: [],
      numSeedsForOneLetter: 3,
      isSeedsFell: false,
      fps60: 16, // 1000/60
      isPaused: false,
      canvasBg: '#2f2f2f',
      barrier: null,
      isDebug: false,
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
    viewPortWidth() {
      return window.innerWidth
    },
    viewPortHeight() {
      return window.innerHeight
    },
  },
  methods: {
    setBarrier(barrier) {
      this.barrier = barrier
    },
    addText() {
      this.lettersRoot = document.querySelector('#lettersRoot')
      let el
      this.lettersRoot.innerHTML = ''
      ;[...this.description].forEach((letter) => {
        el = document.createElement('i')
        el.innerText = letter
        el.className = 'hide'
        this.lettersRoot.append(el)
      })
    },
    startShowText() {
      let i = 0
      let letters = this.createLetters()

      intervalLetters = setInterval(() => {
        if (i <= letters.length - 1) {
          this.showLetter(letters[i])
        }
        if (this.isSeedsFell) clearInterval(intervalLetters)
        i++
      }, this.fps60)
    },
    showLetter(letter) {
      letter['el'].style.opacity = 1
      this.addSeed({ x: letter.x1, y: letter.y1 })
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
      for (let i = 0; i < this.numSeedsForOneLetter; i++) {
        let seed = new Seed(positions.x, positions.y)
        this.seeds.push(seed)
      }
    },
    startSeedsFall() {
      if (this.isPaused) return
      intervalSeed = setInterval(() => {
        if (this.isSeedsFell) clearInterval(intervalSeed)

        if (this.isPaused) return
        this.clearCanvas()
        this.updateSeeds()
      }, this.fps60)
    },
    drawSeed(seed) {
      ctx.fillStyle = '#fff'
      ctx.fillRect(seed.x, seed.y, seed.size, seed.size)
    },
    clearCanvas() {
      ctx.fillStyle = this.canvasBg
      ctx.fillRect(0, 0, this.viewPortWidth, this.viewPortHeight)
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
      let canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d')
      canvas.width = this.viewPortWidth
      canvas.height = this.viewPortHeight
    },
    startAnimations() {
      this.createCanvas()
      this.addText()
      this.startShowText()
      this.startSeedsFall()
    },
  },
  watch: {
    isPageLoaderHide() {
      this.startAnimations()
    },
  },
  created() {
    if (this.isDebug) this.setPauseKey('Space')
  },
  mounted() {
    if (this.isPageLoaderHide) {
      this.startAnimations()
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
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
