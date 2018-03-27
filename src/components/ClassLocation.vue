<template>
  <div class="section">
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-3">
            <article class="tile is-child">
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child">
              <div class="card is-dark">
                <header class="card-header">
                  <p class="card-header-title is-size-4">Class Location</p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <ul v-for="(location, key) in locations" :key="location.room">
                      <li v-if="location.isNow === true">(x) {{location.room}} on {{location.time}}
                        <button class="button is-small is-text"
                        @click.prevent="backLocation(key)">Back</button>
                      </li>
                      <li v-else>( ) {{location.room}}
                        <button class="button is-small is-light"
                        @click.prevent="toggleLocation(key)">Go Here</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div class="tile is-parent is-3">
            <article class="tile is-child">
            </article>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from '../axios'
instance.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('token'))

export default {

  name: 'ClassLocation',
  data () {
    return {
      locations: JSON.parse(localStorage.getItem('locations')) || [
            {room: 'CLASS ROOM', time: null, isNow: false},
            {room: 'ART', time: null, isNow: false},
            {room: 'CAFETERIA', time: null, isNow: false},
            {room: 'CHOIR', time: null, isNow: false},
            {room: 'COVERED AREA', time: null, isNow: false},
            {room: 'LIBRARY', time: null, isNow: false},
            {room: 'P.E.', time: null, isNow: false},
            {room: 'RECESS', time: null, isNow: false},
            {room: 'SCIENCE LAB', time: null, isNow: false}
          ],
    }
  },
  methods: {
    toggleLocation(i) {
      this.cleanView()
      const td = this.timeStamp()
      this.locations[i].isNow = !this.locations[i].isNow
      this.locations[i].time = td.toLocaleString()
      localStorage.removeItem('locations')
      localStorage.setItem('locations', JSON.stringify(this.locations))
    },
    backLocation() {
      this.cleanView()
      localStorage.removeItem('locations')
    },
    timeStamp() {
      return new Date() // init time variable
    },
    cleanView() {
      this.locations.forEach((spot) => { // loop it up
        if (spot.isNow !== false) { // check if the is now is on
          spot.time = null // if it is lets change the time to null
          spot.isNow = false // change the isNow to flase so we can set a new item
        }
      })
    }
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
