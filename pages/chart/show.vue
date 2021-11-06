<template>
  <div>
    <div id="tree">dd</div>
  </div>
</template>
<router>
{
  name: 'tree.show'
}
</router>


<script>
// import piedigree from "pedigree-chart";
export default {
  layout: "auth",

  methods: {
    fetchData() {
      this.$axios
        .$get("/api/tree/show")
        .then((res) => res.json())
        .then((res) => {
          const pedigreeChart = new WebtreesPedigreeChart.PedigreeChart(
            "#tree",
            {
              labels: chartParams.labels,
              generations: optionGenerations,
              defaultColor: chartParams.defaultColor,
              fontColor: chartParams.fontColor,
              showEmptyBoxes: optionShowEmptyBox,
              treeLayout: optionLayout,
              rtl: chartParams.rtl,
            }
          );
          pedigreeChart.cssFile = "/assets/css/svg.css";
          // Draw chart
          pedigreeChart.draw(res.data);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style>
</style>
