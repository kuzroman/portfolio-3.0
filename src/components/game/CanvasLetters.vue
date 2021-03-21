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
    <canvas
      id="canvas"
      :width="viewPortWidth"
      :height="viewPortHeight"
    ></canvas>

    <DebugInput
      v-if="isDebug"
      :isDebug="isDebug"
      :seeds="seeds"
      :bullets="bullets"
      :letters="letters"
      :shooter="shooter"
      @debug-input--pause="pause"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Canvas from './abstractions/Canvas'
import Seed from './abstractions/Seed'
import Bullet from './abstractions/Bullet'
import Letter from './abstractions/Letter'
import DebugInput from './DebugInput.vue'
import LetterTag from './LetterTag.vue'
import CustomAudio from '../abstractions/Audio'
import bitMp3 from '../../assets/media/explode.mp3'

const audioBit = new CustomAudio(bitMp3, 0.3)
let intervalLetters, animationId

export default {
  name: 'CanvasLetters',
  components: { DebugInput, LetterTag },

  props: {
    isDebug: { type: Boolean, default: false },
    barrier: { type: Object, default: null },
    shooter: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      seeds: [],
      bullets: [],
      numSeedsForOneLetter: 3,
      fps60: 16, // 1000/60
      isPaused: false,
      canvas: null,
    }
  },

  computed: {
    ...mapGetters('app', ['isPageLoaderHide']),
    ...mapGetters('game', ['shots', 'letters', 'aliveLetters']),

    description() {
      return this.isDebug
        ? 'Hello q'
        : 'Hello, my name is Roman.|' +
            'I am a Front-End developer with 10 years experience.|' +
            'SPA, js, Vue, HTML, sass... are my passion.|' +
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
      this.prepareToGame()
    },

    shots() {
      let bullet = new Bullet(this.shooter.x1, this.shooter.y1)
      this.bullets.push(bullet)
      this.startAnimation()
    },
  },
  methods: {
    ...mapMutations('game', [
      'setIsSeedsFall',
      'setIsGameFinished',
      'setLetters',
      'updateLetters',
      'showLetter',
      'killLetter',
    ]),

    createLetters() {
      const letters = Array.from(
        this.description,
        (letter, i) => new Letter(letter, i)
      )
      this.setLetters(letters)
    },

    startShowLetters() {
      let i = 0,
        letter
      intervalLetters = setInterval(() => {
        if (i <= this.letters.length - 1) {
          letter = this.letters[i]
          // letter.isShow = true
          this.showLetter(letter)
          // Vue.set(this.letters, i, letter)
          this.updateLetters(letter)
        } else {
          clearInterval(intervalLetters)
        }
        i++
      }, this.fps60)
    },

    // data has position XY from LetterTag
    letterShowed(data) {
      let letter = this.letters[data.id]
      this.updateLetters({ ...letter, ...data })
      this.addSeed(data)
    },

    addSeed(props, type) {
      for (let i = 0; i < this.numSeedsForOneLetter; i++) {
        let seed = new Seed(props.x1, props.y1, type)
        this.seeds.push(seed)
      }
    },

    startAnimation() {
      this.setIsSeedsFall(true)
      clearInterval(animationId)

      animationId = setInterval(() => {
        if (this.isPaused) return
        this.canvas.clearCanvas(this.viewPortWidth, this.viewPortHeight)

        this.updateSeeds()
        this.updateBullets()
        // console.log(1)

        if (!this.seeds.length && !this.bullets.length) {
          clearInterval(animationId)
          this.setIsSeedsFall(false)
        }
      }, this.fps60)
    },

    updateSeeds() {
      this.seeds = this.seeds.filter((seed) => {
        seed.update(this.barrier)

        if (seed.type === 'shrapnel') {
          this.checkDamage(this.shooter, seed)
        }

        this.canvas.drawRect(seed.x1, seed.y1, seed.size)
        return !seed.isStopped
      })
    },

    updateBullets() {
      this.bullets = this.bullets.filter((bullet) => {
        bullet.update()
        if (this.aliveLetters.length) {
          this.checkGoals(bullet, this.aliveLetters)
        } else {
          this.setIsGameFinished(true)
        }

        this.canvas.drawRect(bullet.x1, bullet.y1, bullet.size, '#fc0')
        // this.canvas.drawRing(bullet.x1, bullet.y1, bullet.size, '#fc0')
        return !bullet.isStopped
      })
    },

    checkGoals(bullet, aliveLetters) {
      aliveLetters.forEach((letter) => {
        if (
          bullet.y1 < letter.y1 &&
          ((bullet.x1 < letter.x1 && letter.x1 < bullet.x2) ||
            (bullet.x1 < letter.x2 && letter.x2 < bullet.x2) ||
            (letter.x1 < bullet.x1 && bullet.x2 < letter.x2))
        ) {
          this.killLetter(letter)
          this.addSeed({ x1: bullet.x1, y1: bullet.y1 }, 'shrapnel')
          audioBit.replay()
        }
      })
    },

    checkDamage(shooter, seed) {
      if (
        shooter.y1 < seed.y1 &&
        shooter.x1 < seed.x1 &&
        seed.x1 < shooter.x2
      ) {
        seed.isStopped = true
        this.$emit('canvas-letters-damage')
      }
    },

    pause(bool) {
      this.isPaused = bool
    },

    prepareToGame() {
      this.canvas = new Canvas('#canvas')
      this.createLetters()
      this.startShowLetters()
      this.startAnimation()
    },
  },

  mounted() {
    if (this.isPageLoaderHide) {
      this.prepareToGame()
    }
  },
  destroyed() {
    clearInterval(intervalLetters)
    audioBit.destroy()
  },
}
</script>

<style lang="scss">
@import '../../assets/styles/props';

.canvas-letters {
  & .letters {
    width: 100%;
    position: absolute;
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

@media (max-width: $mq-phone) {
  .canvas-letters {
    & .letters {
      width: 100%;
      left: 0;
      font-size: 1em;
      padding: 0 4em;
    }
  }
}
</style>
