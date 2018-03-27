<template>
  <div>
    <AppHero>
      <h1 slot="hero" class="title has-text-centered is-size-super is-size-1-mobile">
        {{time || '00:00'}}
      </h1>
      <h2 slot="subtitle" class="subtitle has-text-centered">
        {{ endTime || 'Look Out Below, for time inputs!' }}
      </h2>
    </AppHero>

    <div class="has-text-centered section">
      <button class="button is-large is-dark"
      @click.prevent="timer(30)">30 Sec.</button>
      <button class="button is-large is-dark"
      @click.prevent="timer(300)">5 Min.</button>
      <button class="button is-large is-dark"
      @click.prevent="timer(900)">15 Min.</button>
    </div>
  </div>
</template>

<script>
  import AppHero from './Hero.vue'

export default {
  components: {
    'AppHero':AppHero
  },
  props: {},
  name: 'TimeClock',
  data () {
    return {
      time: null,
      endTime: null,
      countdown: null
    }
  },
  methods: {
    timer(sec) {
      clearInterval(this.countdown)
      let now = Date.now()
      let then = now + sec * 1000
      this.displayTimeLeft(sec)
      this.displayEndTime(then)
      this.countdown = setInterval(() => {
        let secLeft = Math.round((then - Date.now()) / 1000)
        // check if we should stop
        if (secLeft < 0) {
          this.time = `0:00`
          this.endTime = 'Times Up!'
          clearInterval(this.countdown)
          return
        }
        // display
        this.displayTimeLeft(secLeft)
      }, 1000)
    },
    displayTimeLeft(sec) {
      let min = Math.floor(sec / 60)
      let remSec = sec % 60
      let display = `${min}:${remSec < 10 ? '0' : '' }${remSec}`
      this.time = display
    },
    displayEndTime(timeStamp) {
      let end = new Date(timeStamp)
      let hours = end.getHours()
      let min = end.getMinutes()
      this.endTime = `Finish time ${hours > 12 ? hours - 12 : hours}:${min < 10 ? '0' : '' }${min}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-size-super {
  font-size: 250px;
}
</style>
