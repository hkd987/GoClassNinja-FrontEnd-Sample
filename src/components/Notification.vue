<template>
  <div class="notification"
  :class="{ 'is-danger': danger,
          'is-success': success,
          'is-warning': warning}">

        <button class="delete" @click.prevent="close()"></button>
        <slot name="message"></slot>
  </div>
</template>

<script>



export default {
  name: 'Notification',
  props: {
    danger: {
      type: Boolean
    },
    success: {
      type: Boolean
    },
    warning: {
      type: Boolean
    }
  },
  data () {
    return {

    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
