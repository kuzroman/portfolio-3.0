<template>
  <div class="letter-box">
    <div class="letters" id="lettersEl"></div>
    <canvas id="canvas"></canvas>

    <DebugInput
      v-if="isDebug"
      :isDebug="isDebug"
      :seeds="seeds"
      @debug-input--pause="pause"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Letter from '../../game/Letter'
import Seed from '../../game/Seed'
import DebugInput from './DebugInput.vue'

let intervalLetters, intervalSeed
let ctx = HTMLElement || null

export default {
  name: 'LettersBox',
  components: { DebugInput },
  props: {
    isDebug: { type: Boolean, default: false },
    barrier: { type: Object, default: null },
  },
  data() {
    return {
      seeds: [],
      numSeedsForOneLetter: 3,
      isSeedsFell: false,
      fps60: 16, // 1000/60
      isPaused: false,
      canvasBg: '#2f2f2f',
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
  watch: {
    isPageLoaderHide() {
      this.startAnimations()
    },
  },
  methods: {
    addText() {
      this.lettersEl = document.querySelector('#lettersEl')
      let el
      this.lettersEl.innerHTML = ''
      ;[...this.description].forEach((letter) => {
        el = document.createElement('i')
        el.innerText = letter
        el.className = 'hide'
        this.lettersEl.append(el)
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
      this.lettersEl.querySelectorAll('i').forEach((el) => {
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
    pause(bool) {
      this.isPaused = bool
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
.letter-box {
  & .letters {
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 1;
    color: #fff;
    font-size: 1.4em;
    text-align: center;
    margin-top: 8em;

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
    //opacity: 0.5;
  }
}

@media (max-width: 481px) {
  .letter-box {
    & .letters {
      width: 100%;
      left: 0;
      font-size: 1em;
      padding: 0 4em;
    }
  }
}
//@media (min-width:481px)  { /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */ }
//@media (min-width:641px)  { /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */ }
//@media (min-width:961px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */ }
//@media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ }
//@media (min-width:1281px) { /* hi-res laptops and desktops */ }
</style>
