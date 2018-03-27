<template>
  <div class="navbar-menu is-hidden-touch">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control"
          v-if="!this.$store.getters.isAuthenticated">
            <router-link
              to="/Login"
              class="button is-outlined"
              v-html="login">
            </router-link>
          </p>
          <p class="control"
          v-if="!this.$store.getters.isAuthenticated">
            <router-link
              to="/signup"
              class="button is-info is-outlined"
              v-html="signup">
            </router-link>
          </p>
          <!-- TEACHER NAV -->
          <p class="control"
          v-if="userRole === 'TEACHER'">
            <router-link
              to="/time-clock"
              class="button is-outlined">
              <span class="icon"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
            </router-link>
          </p>
          <p class="control"
          v-if="userRole === 'TEACHER'">
            <router-link
              to="/chart"
              class="button is-outlined">
              <span class="icon"><i class="fa fa-line-chart" aria-hidden="true"></i></span>
            </router-link>
          </p>
          <p class="control"
          v-if="userRole === 'TEACHER'">
            <router-link
              to="/class-location"
              class="button is-outlined">
              <span class="icon"><i class="fa fa-compass" aria-hidden="true"></i></span>
            </router-link>
          </p>
          <!-- ADMIN NAV -->
          <p class="control"
          v-if="userRole === 'ADMIN'">
            <router-link
              to="/new-student"
              class="button is-outlined">
              <span class="icon"><i class="fa fa-graduation-cap" aria-hidden="true"></i></span>
            </router-link>
          </p>
          <!-- COMMMON LOGGED IN NAV -->
          <p class="control"
          v-if="this.$store.getters.isAuthenticated">
          <a
            @click="signout()"
            href="/#/"
            class="button is-outlined is-danger">
            <span class="icon">
              <i class="fa fa-sign-in" aria-hidden="true"></i>
            </span>
            <span>
              Sign Out
            </span>
          </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavDesktop',
  data () {
    return {
      signup: '<span class="icon"><i class="fa fa-user-plus" aria-hidden="true"></i></span> <span>Sign Up</span>',
      login: '<span class="icon"><i class="fa fa-sign-in" aria-hidden="true"></i></span><span>Log In</span>'
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('logout')
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
