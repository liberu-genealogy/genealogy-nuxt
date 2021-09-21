import Vue from 'vue'
import { Pie } from 'vue-chartjs'

Vue.component('pie-chart', {
    extends: Pie,
    props: {
        chartdata: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted () {
        this.renderChart(this.data, this.options)
    }
})