<template>
  <UI_IconBurger class="icon-burger" @click.native="switchMenu" />
</template>

<script>
import UI_IconBurger from './UI/_IconBurger.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'iconBurger',
  components: { UI_IconBurger },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isMenuNavigationOpened']),
  },
  methods: {
    ...mapMutations(['setIsMenuNavigation']),

    switchMenu() {
      this.setIsMenuNavigation(!this.isMenuNavigationOpened)
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.icon-burger {
  position: fixed;
  top: 1em;
  right: 2em;
  z-index: $zIndex-3;
}

@media (max-width: 481px) {
  .icon-burger {
    top: 2em;
    right: 1em;
  }
}
</style>
