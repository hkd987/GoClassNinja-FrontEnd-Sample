<template>
  <div class="section">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child box notification is-warning is-bold">
              <h3 class="is-size-3 has-text-centered is-padded-top">Students Seen</h3>
              <p class="is-size-1 has-text-centered">{{ studentsSeen || 0}}</p>
            </article>
            <article class="tile is-child box notification is-danger is-bold">
              <h3 class="is-size-3 has-text-centered is-padded-top">Negatives Given</h3>
              <p class="is-size-1 has-text-centered">{{ negativesGiven || 0}}</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <BarChart
              :chart-data="datacollection"
              :options="options"></BarChart>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box notification is-info is-bold">
            <h3 class="is-size-4-mobile is-size-3-desktop has-text-centered">{{ quote }}</h3>
            <h3 class="is-size-6-mobile is-size-5-desktop has-text-centered">- {{ auther }} -</h3>
          </article>
        </div>
      </div>
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box notification is-success is-bold">
          <h3 class="is-size-3 has-text-centered">Positive Money Total</h3>
          <p class="is-size-1 has-text-centered">{{ moneyTotal || 0}}</p>
        </article>
        <article class="tile is-child box">
          <LineChart
          :chart-data="linecollection"
          :options="options"></LineChart>
        </article>
      </div>
    </div>
  </div>
</template>



<script>
import BarChart from './BarChart'
import LineChart from './LineChart'
import { instance } from '../axios'
instance.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('token'))

export default {
  name: 'Chart',
  components: {
    BarChart,
    LineChart
  },
  data () {
    return {
      datacollection: null,
      linecollection: null,
      options: "{responsive: true, maintainAspectRatio: true}",
      studentsSeen: '',
      negativesGiven: '',
      moneyTotal: '',
      quote: '',
      auther: ''
    }
  },
  methods: {
    async getChartData() {
      const chartData = await instance.get('/history')
      // build chart from only postive points given
      const posPoint = chartData.data.data.filter((item) => item.Amount > 0)
      // reduce down students and count how many each kid has gotten
      const count = posPoint.reduce((obj, item) => {
        obj[item.studentID] = (obj[item.studentID] || 0) + 1
        return obj
      }, {})
      // put data on the page.
      this.datacollection = {
        labels: Object.keys(count),
        datasets: [{
          label: 'Money Chart',
          backgroundColor: '#0984e3',
          borderColor: '#0984e3',
          data: Object.values(count)
        }]
      }
      // build line chart data
      const dataLine = posPoint.reduce((obj, item) => {
        obj[item.TimeDate] = (obj[item.TimeDate] || 0) + 1
        return obj
      }, {})
      const dataLineKey = Object.keys(dataLine)
      const splitData = []
      for (const value of dataLineKey) {
        const splitPoint = value.split(', ')
        splitData.push(splitPoint[0])
      }
      const lineDataValues = splitData.reduce((obj, item) => {
        obj[item] = (obj[item] || 0) + 1
        return obj
      }, {})
      this.linecollection = {
        labels: Object.keys(lineDataValues),
        datasets: [{
          label: 'Daily Money',
          backgroundColor: '#0984e3',
          borderColor: '#0984e3',
          data: Object.values(lineDataValues),
          fill: false
        }]
      }
      // build students seen
      this.studentsSeen = Object.keys(count).length
      // build total money given out
      const reducer = (accumulator, currentValue) => accumulator + currentValue; //helper function to reduce
      this.moneyTotal = Object.values(count).reduce((reducer)) // put reducer data on the page
      // build negative points given
      const negPoint = chartData.data.data.filter(item => item.Amount < 0) // filter only give negative points
      this.negativesGiven = negPoint.length // put data on the page
    },
    quoteBuilder () {
      fetch('https://quotes.rest/qod')
        .then(blob => blob.json())
        .then(res => {
          this.auther = res.contents.quotes[0].author
          this.quote = res.contents.quotes[0].quote
        })
    }
  },
  created() {
    this.getChartData()
    this.quoteBuilder()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-padded-top { padding-top: 20px; }
.is-padded-top-lots { padding-top: 40px; }
</style>
