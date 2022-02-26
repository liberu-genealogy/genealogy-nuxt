<template>
  <div>
    <div id="tree"></div>
  </div>
</template>
<router>
{
  name: 'pedigree.show'
}
</router>


<script>
import { EnsoTable } from "@enso-ui/tables/bulma";
import { PedigreeChart } from "/assets/js/modules/index";
import { ref, computed, useStore } from 'vue';
export default {
  layout: 'auth',
  meta: {
    permission: { name: 'trees menu' },
    title: 'Trees - Index'
  },
  components: { EnsoTable },
  setup() {
    function fetchData() {
      this.$axios
        .$get("/api/trees/show")
        .then((res) => {
          const pedigreeChart = new PedigreeChart(
            "webtrees-pedigree-chart-container",
            {
              labels: {
                zoom: "Use Ctrl + scroll to zoom in the view",
                move: "Move the view with two fingers",
              },
              generations: 4,
              defaultColor: "#0000FF",
              fontColor: "#0000FF",
              showEmptyBoxes: true,
              treeLayout: "right",
              rtl: "rtl",
            }
          );
          pedigreeChart.cssFile = "assets/css/svg.css";
          pedigreeChart.draw(res);
        });
    }
    onMounted(() => {
      this.fetchData();
    })
  }
}

</script>

<style lang="scss">
</style>
