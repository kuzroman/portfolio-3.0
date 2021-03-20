<template>
  <div class="leader-board" :class="state">
    <h2 class="title">Leader Board</h2>

    <DashedList>
      <div class="result" v-for="(leader, i) in getTop10" :key="i">
        <div>
          <span>{{ i + 1 }}st.</span>
          <span>{{ leader.user }}</span>
        </div>
        <div>{{ leader.score }} points</div>
      </div>
    </DashedList>

    <label class="your-score">
      <span>Your name</span>
      <input
        type="text"
        placeholder="Short name, or emotion <3"
        maxlength="30"
        v-model="playerName"
        @keypress.enter="saveResult"
      />
      <span>{{ yourScore }} points</span>
    </label>

    <CloseSpinner @click.native="closeLeaderBoard" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DashedList from '../UI/DashedList.vue'
import CloseSpinner from '../UI/CloseSpinner.vue'

// const defaultState = 'hide'

export default {
  name: 'LeaderBoard',
  components: { DashedList, CloseSpinner },

  data() {
    return {
      yourScore: 1000,
      playerName: '',
      state: 'active',
    }
  },
  computed: {
    ...mapGetters('leaderBoard', ['leaders']),

    getTop10() {
      return this.leaders.sort((a, b) => b.score - a.score).slice(0, 10)
    },
  },
  methods: {
    ...mapActions('leaderBoard', ['getLeaders']),

    saveResult() {},

    closeLeaderBoard() {
      this.state = 'hide'
    },
  },
  mounted() {
    this.getLeaders()
  },
}
</script>

<style lang="scss">
@import '../../styles/props';

.leader-board {
  width: 100%;
  height: 100%;
  background: $color-8;
  position: relative;
  transform: translateY(-110%);
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  z-index: $zIndex-4;

  &.active {
    transform: translateY(0);
    opacity: 1;
  }
  &.hide {
    transform: translateY(110%);
    opacity: 0;
  }

  .title {
    font-size: 2em;
    text-align: center;
    padding: 2em;
  }

  .dashed-list {
    background-color: $color-6;
    padding: 2em;
    width: 80%;
    max-width: 800px;
    margin: 0 auto;

    .result {
      span:first-child {
        width: 3em;
        color: $color-12;
        display: inline-block;
        text-align: right;
      }
    }

    @media (max-width: $mq-phone) {
      width: 100%;
      padding: 1em;
    }
  }

  .your-score {
    text-align: center;
    color: $color-12;
    margin: 5em auto;
    font-weight: bold;
    display: block;

    input {
      min-width: 16em;
      margin: 0 2em;
      outline: none;
      padding: 6px 8px;
      border-radius: 3px;
      border: none;
      box-shadow: 0 4px 10px 2px #000;
      font-size: 1.2em;
    }

    @media (max-width: $mq-phone) {
      margin-top: 2em;

      > span {
        display: block;
        margin: 1em 0;
      }
    }
  }

  .close-spinner {
    width: 5em;
    height: 5em;
    top: 3em;
    right: 2em;
  }
}
</style>
