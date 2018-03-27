<template>
  <div id="app">
    <AppNav></AppNav>

    <router-view/>

    <AppFooter>
      <p slot="footertext">
        Made with <span><i class="fa fa-heart" aria-hidden="true"></i></span> by a teacher for teachers!
      </p>
    </AppFooter>
  </div>
</template>

<script>
import AppNav from './components/Nav.vue'
import AppFooter from './components/Footer.vue'

export default {
  components: {
    'AppNav': AppNav,
    'AppFooter': AppFooter
  },
  name: 'App',
data () {
  return {

    }
  }
}
</script>

<style>

</style>
