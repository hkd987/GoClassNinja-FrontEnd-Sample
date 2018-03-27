<template>
  <div>
    <section class="hero is-large is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <slot name="hero"></slot>
          <slot name="subtitle"></slot>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {},
  name: 'Hero',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
