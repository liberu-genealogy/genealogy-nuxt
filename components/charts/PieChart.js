import { Pie } from 'vue-chartjs'
import { onMounted } from 'vue'

export default {
    extends: Pie,
    props: {
        data: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    setup() {
        onMounted(() => {
            this.renderChart(this.data, this.options)
        })
    }
}