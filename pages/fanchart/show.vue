<template>
  <div id="webtrees-fan-chart-container"></div>
</template>
<router>
{
    name: 'families.show'
}
</router>
<script>
import { FanChart } from "/assets/js/modules/fan-chart/index";
export default {
  layout: "auth",
  meta: {
    permission: { name: "fanchart menu" },
    title: "Fanchart - Show",
  },
  methods: {
    fetchData() {
      this.$axios
        .$get("/api/trees/show")
        // .then((res) => res.json())
        // .then((response) => response.json())
        .then((res) => {
          // console.log(res.data);
          const pedigreeChart = new FanChart("webtrees-fan-chart-container", {
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
          });

          pedigreeChart.cssFile = "assets/css/fanchart/svg.css";
          // Draw chart
          console.log(res);
          pedigreeChart.draw(res);

          const fanChart = FanChart("#webtrees-fan-chart-container", {
            labels: res.labels,
            generations: 4,
            fanDegree: 90,
            defaultColor: "#0000FF",
            fontColor: "#0000FF",
            fontScale: parseInt(storage.read("fontScale")),
            // fontColor: data.fontColor,
            hideEmptySegments: storage.read("hideEmptySegments"),
            showColorGradients: storage.read("showColorGradients"),
            showParentMarriageDates: storage.read("showParentMarriageDates"),
            rtl: true,
            innerArcs: parseInt(storage.read("innerArcs")),
          });
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