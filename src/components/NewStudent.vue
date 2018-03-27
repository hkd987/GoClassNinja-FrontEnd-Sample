<template>
  <div class="section" v-if="userRole === 'ADMIN'">
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
                  <p class="card-header-title is-size-4">New Student</p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <form>
                      <div class="field">
                        <label class="label">Student ID</label>
                          <div class="control">
                            <input class="input" placeholder="Student ID" type="text" name="StudentID" v-model="StudentID">
                          </div>
                        </div>

                      <div class="field">
                        <label class="label">First Name</label>
                          <div class="control">
                            <input class="input" placeholder="First Name" type="text" name="FirstName" v-model="FirstName">
                          </div>
                        </div>

                        <div class="field">
                          <label class="label">Last Name</label>
                            <div class="control">
                              <input class="input" placeholder="Last Name" type="text" name="LastName" v-model="LastName">
                            </div>
                          </div>

                          <div class="field">
                            <label class="label">Grade</label>
                            <div class="control">
                              <div class="select">
                                <select v-model="grade">
                                  <option disabled>Select dropdown</option>
                                  <option value="PK">Pre-K</option>
                                  <option value="KG">Kinder</option>
                                  <option value="01">1st</option>
                                  <option value="02">2nd</option>
                                  <option value="03">3rd</option>
                                  <option value="04">4th</option>
                                  <option value="05">5th</option>
                                  <option value="06">6th</option>
                                  <option value="07">7th</option>
                                  <option value="08">8th</option>
                                  <option value="09">9th</option>
                                  <option value="10">10th</option>
                                  <option value="11">11th</option>
                                  <option value="12">12th</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <input type="submit" class="button" @click.prevent="sendNewStudent" values="Make New Student"/>
                    </form>
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

  name: 'NewStudent',
  data () {
    return {
      FirstName: null,
      StudentID: null,
      LastName: null,
      grade: null
    }
  },
  methods: {
    async sendNewStudent () {
      //const respone = await instance.post('')
      console.log(this.grade)
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
