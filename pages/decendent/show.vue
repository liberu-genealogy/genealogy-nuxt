<template>
  <div>
    <loading
        :active="isLoading"
        :color="color"
        :background-color="backgroundColor"
    />
      <div class="select-box">
        <v-select
            style="width: 100%"
            v-model="selected_person"
            :options="persons.map(item => item = {label: item.displayname, value: item.id})"
            @input="fetchData"
        />
        <v-select
            style="width: 100px"
            v-model="generation"
            :options="Array.from(Array(10).keys()).map(item => item = {label: item, value: item})"
            @input="fetchData"
        />
      </div>
    <div style="height: 700px" id="webtrees-descendants-chart-container"></div>
  </div>
</template>
<router>
{
    name: 'decendent.show'
}
</router>
<script>
import { DescendantsChart } from "/assets/js/descendants-chart/modules/index";
import vSelect from 'vue-select'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import style from '/assets/css/svg.css'
import {createDisplayName, getBirthYear, getDeathYear } from '/utils/personHelper';
export default {
  layout: "auth",
  meta: {
    permission: { name: "decendentchart menu" },
    title: "DecendentChart - Show",
  },
  components: {
    vSelect,
    Loading
  },
  data: () => ({
    familyData: {},
    persons: [],
    selected_person: {},
    data: {},
    isLoading: false,
    color: '#4fcf8d',
    backgroundColor: '#ffffff',
    generation: { label: 1, value: 1 },
    thumbnail_man: "/images/thumbnail-man.svg",
    thumbnail_woman: "/images/thumbnail-woman.svg",
    thumbnail_middle: "/images/thumbnail-unknown.svg"
  }),
  methods: {
    getPersons() {
      this.isLoading = true;
      this.$axios
        .$get("/api/getPersons")
        .then((response) => {
          this.persons = response.map(person => {
            const displayname = !!person.birth_year
              ? `${person.name} (${person.birth_year})`
              : !!person.birthday
              ? `${person.name} (${(new Date(person.birthday)).getFullYear()})`              
              : person.name;
            return {
              ...person,
              displayname,
            }
          });
          this.isLoading = false;
        });
    },
    async fetchData() {
      if(!this.selected_person.value) return
      let params = {start_id: this.selected_person.value, generation: this.generation.value }
      this.$axios
        .$get("/api/decendent/show", { params: params })
        .then((res) => {
          this.data = res
          // console.log(res)
          // return;
          this.familyData = this.checkFamilyData()
          const descendantsChart = new DescendantsChart("#webtrees-descendants-chart-container", {
            labels: {
              zoom: "Use Ctrl + scroll to zoom in the view",
              move: "Move the view with two fingers",
            },
            generations: 1,
            defaultColor: "#0000FF",
            treeLayout: "down",
            rtl: "rtl",
          });

          descendantsChart.draw(this.familyData)
        });
    },
    checkBirthDeathDate(birth, death) {
      if(death) {
        if(!birth) return ""
        return `${birth.toString().slice(0, 4)}-${death.toString().slice(0, 4)}`
      }else {
        if(!birth) return ""
        return `Born ${birth.toString().slice(0, 4)}`
      }
    },
    checkChildren(id) {
      let children = [];
      let childIds = [];

      this.data.persons[id].own_unions?.forEach((union) => {
        if(this.data.unions[union]) {
          this.data.unions[union].children.forEach((childId) => {
            childIds.push(childId)
          })
        }
      })

      // console.log("person", this.data.persons[id])
      // console.log("ChildIds", childIds, id)

      if(!childIds.length) return;
      this.data.persons[id].own_unions?.forEach((union, idx) => {
        if (idx > 3) return children;
        this.data.unions[union]?.children.forEach((childId) => {
          let person = this.data.persons[childId]
          children.push({
            id: person.id,
            name: person.name,
            title: person.titl,
            firstNames:[createDisplayName(person)],
            lastNames:[''],
            generation: person.generation,
            sex: person.sex ? person.sex : "M",
            xref : 1,
            birth: getBirthYear(person),
            death: getDeathYear(person),
            timespan: this.checkBirthDeathDate(person.birthday ? person.birthday : person.birth_year, person.deathday ? person.deathday : person.death_year),
            thumbnail : person.sex ? person.sex == 'F' ? this.thumbnail_woman : this.thumbnail_man : thumbnail_middle,
            children: this.checkChildren(childId)
          })
        })
      })
      return children;
    },

    checkFamilyData(id = null) {
      const person = id ? this.data.persons[id] : this.data.persons[this.data.start]
      return {
        id: person.id,
        name: person.name,
        title: person.titl,
        firstNames:[createDisplayName(person)],
        lastNames:[''],
        generation: person.generation,
        sex: person.sex ? person.sex : "M",
        xref : 1,
        birth: getBirthYear(person),
        death: getDeathYear(person),
        timespan: this.checkBirthDeathDate(person.birthday ? person.birthday : person.birth_year, person.deathday ? person.deathday : person.death_year),
        thumbnail : person.sex ? person.sex == 'F' ? this.thumbnail_woman : this.thumbnail_man : thumbnail_middle,
        children: this.checkChildren(this.data.start)
      }
    },
  },
  mounted() {
    this.getPersons();
  },
  computed: {
    style() {
      return style
    }
  }
};
</script>

<style lang="scss">
.select-box {
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
}
</style>