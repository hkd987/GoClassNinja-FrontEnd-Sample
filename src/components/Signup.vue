<template>
  <section class="hero is-light is-bold is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Signup</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">

            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="email" placeholder="Your Email" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="Your Password">
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                </label>
              </div>
              <button class="button is-block is-info is-large is-fullwidth">Signup</button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link
              to="/login"
              class="button is-small is-river">
              Login
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
export default {
  name: 'Login',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
