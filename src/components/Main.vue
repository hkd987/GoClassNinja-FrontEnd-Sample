<template>
  <div>
    <TeacherView v-if="userRole === 'TEACHER'"></TeacherView>
    <AdminView v-if="userRole === 'ADMIN'"></AdminView>
  </div>
</template>

<script>

import TeacherView from './TeacherView'
import AdminView from './AdminView'
import { instance } from '../axios'
instance.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('token'))

export default {

  name: 'Main',
  data () {
    return {

    }
  },
  components: {
    TeacherView,
    AdminView
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole
    }
  },
  methods: {
    async getAllStudents() {
      const resposne = await instance.get('/students')
      if (resposne.data.error === false) {
        this.$store.dispatch('fillStudentArray', resposne.data.data)
      }
    }
  },
  created() {
    this.getAllStudents()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
