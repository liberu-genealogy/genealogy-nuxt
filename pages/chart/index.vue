<template>
  <!-- <enso-table class="box is-paddingless raises-on-hover" id="notes" /> -->
  <div id="webtrees-pedigree-chart-container"></div>
</template>

<router>
{
    name: 'pedigree.index'
}
</router>
<script>
import { EnsoTable } from "@enso-ui/tables/bulma";
import { PedigreeChart } from "/assets/js/modules/index";
export default {
  layout: "auth",
  meta: {
    permission: { name: "trees menu" },
    title: "Trees - Index",
  },

  components: { EnsoTable },
  methods: {
    fetchData() {
      this.$axios
        .$get("/api/trees/show")
        // .then((res) => res.json())
        // .then((response) => response.json())
        .then((res) => {
          // console.log(res.data);
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
              showEmptyBoxes: "up",
              treeLayout: "right",
              rtl: "rtl",
            }
          );
          pedigreeChart.cssFile = "assets/css/svg.css";
          // Draw chart
          console.log(res);
          pedigreeChart.draw(res);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss">
</style>
