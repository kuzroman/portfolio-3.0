<template>
  <div class="canvas-letters">
    <div class="letters" id="lettersEl">
      <template v-for="letter in letters">
        <LetterTag
          :isShow="letter.isShow"
          :isKilled="letter.isKilled"
          :sign="letter.sign"
          :key="letter.id"
          @letter-tag--show="letterShowed"
        />
      </template>
    </div>
    <canvas id="canvas"></canvas>

    <DebugInput
      v-if="isDebug"
      :isDebug="isDebug"
      :seeds="seeds"
      :bullets="bullets"
      :letters="letters"
      @debug-input--pause="pause"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import Canvas from './models/Canvas'
import Seed from './models/Seed'
import Bullet from './models/Bullet'
import DebugInput from './DebugInput.vue'
import LetterTag from './LetterTag.vue'

let intervalLetters, intervalSeed, intervalBullets

export default {
  name: 'CanvasLetters',
  components: { DebugInput, LetterTag },
  props: {
    isDebug: { type: Boolean, default: false },
    barrier: { type: Object, default: null },
    shot: { type: Object, default: null },
  },
  data() {
    return {
      letters: [],
      seeds: [],
      bullets: [],
      numSeedsForOneLetter: 3,
      fps60: 16, // 1000/60
      isPaused: false,
      canvas: null,
    }
  },
  computed: {
    ...mapGetters(['isPageLoaderHide']),

    description() {
      return this.isDebug
        ? 'Hello'
        : 'Hello, my name is Roman.|' +
            'I am a web Front-End developer and UI enthusiast.|' +
            'SPA, animation, Vue.js, are my passion.|' +
            'Check this out some projects on my Work page.|' +
            'Feel free if you want say hello at kuzroman@list.ru then do it!)'
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
    shot(shot) {
      let bullet = new Bullet(shot.x, shot.y)
      this.bullets.push(bullet)
      this.startBulletMove()
    },
  },
  methods: {
    ...mapMutations([
      'setIsSeedsFall',
      // 'createLetters',
      // 'updateLetter',
      'setIsGameFinished',
    ]),

    createLetters() {
      this.letters = Array.from(this.description, (letter, i) => ({
        sign: letter === ' ' ? '-' : letter,
        isKilled: letter === ' ' || letter === '|',
        isShow: false,
        id: i,
      }))
    },
    updateLetter(letter) {
      Vue.set(this.letters, letter.id, letter)
    },

    startShowLetters() {
      let i = 0,
        letter
      intervalLetters = setInterval(() => {
        if (i <= this.letters.length - 1) {
          letter = this.letters[i]
          this.letters[i].isShow = true
          Vue.set(this.letters, i, letter)
        } else {
          clearInterval(intervalLetters)
        }
        i++
      }, this.fps60)
    },
    letterShowed(data) {
      let letter = this.letters[data.id]
      this.updateLetter({ ...letter, ...data })
      this.addSeed(data)
    },
    addSeed(props) {
      for (let i = 0; i < this.numSeedsForOneLetter; i++) {
        let seed = new Seed(props.x1, props.y1)
        this.seeds.push(seed)
      }
    },
    startSeedsFall() {
      this.setIsSeedsFall(true)
      clearInterval(intervalSeed)
      intervalSeed = setInterval(() => {
        if (this.isPaused) return
        this.canvas.clearCanvas(this.viewPortWidth, this.viewPortHeight)
        this.updateSeeds()
        console.log(1)
        if (!this.seeds.length) {
          clearInterval(intervalSeed)
          this.setIsSeedsFall(false)
        }
      }, this.fps60)
    },
    startBulletMove() {
      clearInterval(intervalBullets)
      intervalBullets = setInterval(() => {
        if (this.isPaused) return
        this.canvas.clearCanvas(this.viewPortWidth, this.viewPortHeight)
        this.updateBullets()
        console.log(2)
        if (!this.bullets.length) {
          clearInterval(intervalBullets)
        }
      }, this.fps60)
    },
    updateSeeds() {
      this.seeds = this.seeds.filter((seed) => {
        seed.updateSeed(this.barrier)
        this.canvas.drawRect(seed.x, seed.y, seed.size)
        return !seed.isStopped
      })
    },
    updateBullets() {
      this.bullets = this.bullets.filter((bullet) => {
        bullet.updateBullet()
        this.updateStateGame(bullet)
        this.canvas.drawRect(bullet.x1, bullet.y1, bullet.size, '#fc0')
        return !bullet.isStopped
      })
    },

    getLifeLetters() {
      return this.letters.filter((letter) => !letter.isKilled)
    },
    checkHits(bullet, lifeLetters) {
      lifeLetters.forEach((letter) => {
        if (
          bullet.y1 < letter.y1 &&
          ((bullet.x1 < letter.x1 && letter.x1 < bullet.x2) ||
            (bullet.x1 < letter.x2 && letter.x2 < bullet.x2))
        ) {
          letter.isKilled = true
        }
      })
    },

    updateStateGame(bullet) {
      let lifeLetters = this.getLifeLetters()
      if (lifeLetters.length) {
        this.checkHits(bullet, lifeLetters)
      } else {
        this.setIsGameFinished(true)
      }
    },

    pause(bool) {
      this.isPaused = bool
    },
    createCanvas() {
      // method should run after mounted!
      let canvas = document.getElementById('canvas')
      canvas.width = this.viewPortWidth
      canvas.height = this.viewPortHeight
      this.canvas = new Canvas(canvas)
    },
    startAnimations() {
      this.createCanvas()
      this.createLetters()
      this.startShowLetters()
      this.startSeedsFall()
      // this.canvasAnimations()
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
    clearInterval(intervalBullets)
  },
}
</script>

<style lang="scss">
.canvas-letters {
  & .letters {
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 1;
    color: #fff;
    font-size: 1.4em;
    text-align: center;
    margin-top: 8em;
  }

  & #canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}

@media (max-width: 481px) {
  .canvas-letters {
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
