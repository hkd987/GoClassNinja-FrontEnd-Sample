<template>
  <footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
      <slot name="footertext"></slot>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  props: {},
  name: 'Footer',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
