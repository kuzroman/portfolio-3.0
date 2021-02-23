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
    ...mapMutations(['setMenuNavigation']),

    switchMenu() {
      this.setMenuNavigation(!this.isMenuNavigationOpened)
      // this.$emit('openNavigation')
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.icon-burger {
  z-index: $zIndex-2;
}
</style>
