<template>
  <div class="section">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child notification is-warning is-bold">
          <p class="title">Schools</p>
          <p class="subtitle">{{ school }}</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-warning is-bold">
          <p class="title">Students</p>
          <p class="subtitle">{{ students }}</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-warning is-bold">
          <p class="title">Teachers</p>
          <p class="subtitle">{{ teachers }}</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from '../axios'

export default {
  name: 'HomeNumbers',
  data () {
    return {
      school: '1',
      students: '1',
      teachers: '1'
    }
  },
  methods: {
    async dataNumbers () {
      const teacherPromise = await instance.get('/teacherdata') || 1 // if prmose fails return 1
      const studentPromise = await instance.get('/studentdata') || 1 // if promise fails return 1
      const schoolPromise = 1 || await instance.get('') // TODO: add in URL of promsise and reorder to take promise first
      Promise.all([teacherPromise, studentPromise, schoolPromise])
        .then((res) => {
            this.teachers = `${res[0].data.data['0'].count}` // set textCOntent of teacherNumber
            this.students = `${res[1].data.data['0'].count}` // set tetContent of studentNumber
            this.school = `${res[2]}` // set the schoolNumber TODO: set actual number when you get a real promise back
        })
        .catch(err => console.log(err)) // catch all the errors
      }
    },
    mounted () {
      this.dataNumbers()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
