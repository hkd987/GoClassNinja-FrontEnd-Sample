<template>
    <AppHero>
      <h1 slot="hero" class="title has-text-centered">
        Need Help?
      </h1>
      <h2 slot="subtitle" class="subtitle has-text-centered">
        Check below for common questions.
      </h2>
    </AppHero>
</template>

<script>
  import AppHero from './Hero.vue'

export default {
  components: {
    'AppHero':AppHero
  },
  props: {},
  name: 'Help',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
