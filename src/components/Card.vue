<template>
  <div class="container">
    <Notification v-on:close="closeGood()" v-if="good" :success="success">
      <p slot="message">{{ messageG }}</p>
    </Notification>

    <Notification v-on:close="closeBad()" v-if="bad" :danger="danger">
      <p slot="message">{{ messageB }}</p>
    </Notification>

    <Notification v-on:close="closeYellow()" v-if="yellow" :warning="warning">
      <p slot="message">{{ messageY }}</p>
    </Notification>


    <div class="columns is-multiline">
      <div class="column is-one-quarter" v-for="(stu, key) in matchArray" :key="stu.StudentID">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{ stu.FirstName }} {{ stu.LastName }}</p>
          </header>
          <div class="card-content">
            <div class="content">
                <p><span class="icon"><i class="fa fa-graduation-cap" aria-hidden="true"></i></span>
                  <span class="icon"><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></span>
                  <b>{{ stu.GradeLevel }}</b></p>
                <p><span class="icon"><i class="fa fa-money" aria-hidden="true"></i></span>
                  <span class="icon"><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></span>
                  <b>${{ stu.MoneyAmount }}</b></p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item"
            @click.prevent="studentUpdateFunds(key)">
              <span class="icon"><i class="fa fa-plus-circle" aria-hidden="true"></i></span>
            </a>
            <slot name="button"></slot>
            <a class="card-footer-item"
            @click.prevent="studentFundsMinus(key)">
              <span class="icon"><i class="fa fa-minus-circle" aria-hidden="true"></i></span>
            </a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from '../axios'
instance.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('token'))
import Notification from './Notification'

export default {
  props: {
    matchArray: {
      type: Array
    }
  },
  name: 'Card',
  data () {
    return {
      good: false,
      bad: false,
      success: true,
      danger: true,
      messageG: '',
      messageB: '',
      messageY: '',
      yellow: false,
      warning: true
    }
  },
  methods: {
    updateHisotryPlus(i) {
      return instance.post('/history', {
        studentID: this.matchArray[i].StudentID,
        Amount: 1,
        TimeDate: new Date().toLocaleString(),
        ExtraData: JSON.stringify({
          preAmount: this.matchArray[i].MoneyAmount,
          newAmount: this.matchArray[i].MoneyAmount + 1
        })
      })
    },
    updateHisotryMinus(i) {
      return instance.post('/history', {
        studentID: this.matchArray[i].StudentID,
        Amount: - 1,
        TimeDate: new Date().toLocaleString(),
        ExtraData: JSON.stringify({
          preAmount: this.matchArray[i].MoneyAmount,
          newAmount: this.matchArray[i].MoneyAmount - 1
        })
      })
    },
    async studentUpdateFunds(i) {
      const history = await this.updateHisotryPlus(i)
      const respone = await instance.put('/money', {
        studentid: this.matchArray[i].StudentID
      })
      if (respone.data.error === false && history.data.error === false) {
        this.messageG = respone.data.message
        this.good = true
        this.matchArray[i].MoneyAmount = this.matchArray[i].MoneyAmount + 1
        this.updateDataArray()
      } else if (respone.data.error === true) {
        this.messageB = respone.data.message
        this.bad = true
      } else if (history.data.error === true) {
        this.messageB = history.data.message
        this.bad = true
      }
    },
    async studentFundsMinus(i) {
      const history = await this.updateHisotryMinus(i)
      const respone = await instance.put('/money/minus', {
        studentid: this.matchArray[i].StudentID
      })
      if (respone.data.error === false && history.data.error === false) {
        this.messageY = respone.data.message
        this.yellow = true
        this.matchArray[i].MoneyAmount = this.matchArray[i].MoneyAmount - 1
        this.updateDataArray()
      } else if (respone.data.error === true) {
        this.messageB = respone.data.message
        this.bad = true
      } else if (history.data.error === true) {
        this.messageB = history.data.message
        this.bad = true
      }
    },
    closeGood() {
      this.good = false
    },
    closeBad() {
      this.bad = false
    },
    closeYellow() {
      this.yellow = false
    },
    async updateDataArray() {
      const resposne = await instance.get('/students')
      if (resposne.data.error === false) {
        this.$store.dispatch('fillStudentArray', resposne.data.data)
      }
    }
  },
  components: {
    Notification
  },
  computed: {
    session () {
      return this.$store.getters.userSession
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
