<template>
  <div>
    <div class="section" v-if="error">
      <Notification v-on:close="close()"  :danger="danger">
        <p slot="message">No students matching that name, Please try again.</p>
      </Notification>
    </div>

    <Hero>
      <div class="field has-addons" slot="hero">
        <div class="control has-icons-left">
          <input v-model="lookUpValue" class="input is-rounded is-medium is-dark" type="text" placeholder="Find a student">
          <span class="icon is-left">
            <i class="fa fa-search"></i>
          </span>
        </div>
        <div class="control">
          <a class="button is-rounded is-medium is-dark"
          @click.prevent="studentSearch()">
            Search
          </a>
        </div>
      </div>
    </Hero>

    <section class="section" v-if="matchArray.length > 0">
      <section class="hero" >
        <Card :matchArray="matchArray">
          <a class="card-footer-item" slot="button"
            @click.prevent="studentUpdateFunds(key)">
            <span class="icon"><i class="fa fa-pencil" aria-hidden="true"></i></span>
          </a>
        </Card>
      </section>
    </section>



  </div>
</template>

<script>
import Hero from './HeroAdmin'
import Notification from './Notification'
import Card from './Card'
export default {

  name: 'AdminView',
  data () {
    return {
      lookUpValue: '',
      matchArray: [],
      error: false,
      danger: true
    }
  },
  components: {
    Hero,
    Notification,
    Card
  },
  methods: {
     findMatches (wordToMatch, someArray) { // called by the displayMatches function
       return someArray.filter(stu => { // helper function to filter for matches in the studentArray
         const regex = new RegExp(wordToMatch, 'gi') // uppper lower doesnt matter and case insinsitve
         return stu.FirstName.match(regex) || stu.LastName.match(regex) //|| stu.StudentID.match(regex)
       })
     },
    studentSearch() {
       this.matchArray = this.findMatches(this.lookUpValue, this.studentsArray)
       if (this.matchArray.length === 0) { // no search resutls let the user know and clean up the mess
         this.lookUpValue = ''
         return this.error = true
       }
       this.error = false
       this.lookUpValue = ''
    },
    close() {
      this.error = false
    }
  },
  computed: {
    studentsArray () {
      return this.$store.getters.studentsArray
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
