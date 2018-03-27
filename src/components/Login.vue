<template>
  <section class="hero is-light is-bold is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">

            <Notification v-on:close="close()" v-if="error" :danger="danger">
              <p slot="message">{{ message }}</p>
            </Notification>

            <form>
              <div class="field">
                <div class="control">
                  <input v-model="username" class="input is-large" type="email" placeholder="Your Email" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input v-model="password" class="input is-large" type="password" placeholder="Your Password">
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                </label>
              </div>
              <button @click.prevent="login()" class="button is-block is-info is-large is-fullwidth bright-day">Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link
              to="/signup"
              class="button is-small is-river">
              Sign Up
            </router-link>
            <span class="icon"><i class="fa fa-circle-o" aria-hidden="true"></i></span>
            <a href="#" class="button is-small is-river">Forgot Password</a>
            <span class="icon"><i class="fa fa-circle-o" aria-hidden="true"></i></span>
            <router-link
              to="/help"
              class="button is-small is-river">
              Need Help?
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
import { instance } from '../axios'
import Notification from './Notification'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: false,
      message: '',
      danger: true
    }
  },
  methods: {
    async login() {
      const resposne = await instance.post('/login', {
        username: this.username,
        password: this.password
      })
      if (resposne.data.error === false) {
        this.$store.dispatch('login', resposne.data)
        .then(() => {
          if(this.$store.getters.isAuthenticated) {
            this.$router.push({ path: '/'})
          }
        })
      }
      if (resposne.data.error === true) {
        this.error = true
        this.message = resposne.data.message
        this.username = ''
        this.password = ''
      }
    },
    close() {
      this.error = false
    }
    },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push({ path: '/main'})
    }
  },
  components: {
    Notification
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
