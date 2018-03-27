<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link
        to="/"
        class="navbar-item">
        {{ navMain }}
      </router-link>
      <button
      class="button navbar-burger"
      :class="{ 'is-active': navActive}"
      @click="navActiveToggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <NavMobile :navActive="navActive" v-on:closeNav="closeNav()"></NavMobile>
    <NavDesktop></NavDesktop>
  </nav>
</template>

<script>
import NavMobile from './NavMobile.vue'
import NavDesktop from './NavDesktop'

export default {
  components: {
    'NavMobile':NavMobile,
    'NavDesktop':NavDesktop
  },
  name: 'Nav',
  data () {
    return {
      navMain: 'Go Class Ninja',
      navActive: false
    }
  },
  methods: {
    navActiveToggle() {
      this.navActive = !this.navActive
    },
    closeNav() {
      this.navActiveToggle()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
