<template>
  <div>
    <AppHero v-if="!this.$store.getters.isAuthenticated">
      <h1 slot="hero" class="title has-text-centered">
        Go Class Ninja
      </h1>
      <h2 slot="subtitle" class="subtitle has-text-centered">
        Turn your classroom managment over to the ninja!
      </h2>
    </AppHero>
    <AppHomeNumbers v-if="!this.$store.getters.isAuthenticated"></AppHomeNumbers>
  </div>
</template>

<script>

import AppHero from './Hero.vue'
import AppHomeNumbers from './HomeNumbers'

export default {
  components: {
    'AppHero':AppHero,
    'AppHomeNumbers':AppHomeNumbers
  },
  name: 'Home',
  data () {
    return {

    }
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push({ path: '/main'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
