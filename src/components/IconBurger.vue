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
      // this.$emit('openNavigation')
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.icon-burger {
  position: fixed;
  right: 50px;
  top: 40px;
  z-index: $zIndex-3;
}
</style>
