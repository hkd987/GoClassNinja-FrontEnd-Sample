<template>
  <div class="navbar-menu is-hidden-desktop"
  :class="{ 'is-active': navActive}">
    <div class="navbar-start">
      <div class="navbar-item"
      v-if="!this.$store.getters.isAuthenticated"
      @click.prevent="closeNav">
      <router-link
        to="/login"
        class="navbar-link">
        Login
      </router-link>
      </div>
      <div class="navbar-item"
      v-if="!this.$store.getters.isAuthenticated"
      @click.prevent="closeNav">
      <router-link
        to="/signup"
        class="navbar-link">
        Sign Up
      </router-link>
      </div>
      <!-- teacher nav mobile -->
      <div class="navbar-item"
        v-if="userRole === 'TEACHER'"
        @click.prevent="closeNav">
        <router-link
          to="/time-clock"
          class="navbar-link">
          Timer
        </router-link>
      </div>
      <div class="navbar-item"
        v-if="userRole === 'TEACHER'"
        @click.prevent="closeNav">
        <router-link
          to="/chart"
          class="navbar-link">
          Chart
        </router-link>
      </div>
      <div class="navbar-item"
        v-if="userRole === 'TEACHER'"
        @click.prevent="closeNav">
        <router-link
          to="/class-location"
          class="navbar-link">
          Class Location
        </router-link>
      </div>
      <!-- admin nav -->
      <div class="navbar-item"
        v-if="userRole === 'ADMIN'"
        @click.prevent="closeNav">
        <router-link
          to="/new-student"
          class="navbar-link">
          New Student
        </router-link>
      </div>
      <!-- common nav logged in -->
      <div class="navbar-item"
      v-if="this.$store.getters.isAuthenticated">
      <a
        @click="signout()"
        href="/#/"
        class="navbar-link">
        Sign Out
      </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['navActive'],
  name: 'NavMobile',
  data () {
    return {

    }
  },
  methods: {
    signout() {
      this.$store.dispatch('logout')
      this.closeNav()
    },
    closeNav() {
      this.$emit('closeNav')
    }
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
