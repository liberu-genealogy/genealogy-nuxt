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
    <div style="height: 700px" id="webtrees-fan-chart-container"></div>
  </div>
</template>
<router>
{
name: 'fanchart.show'
}
</router>
<script>
import { FanChart } from "/assets/js/fan-chart/modules/index";
import vSelect from 'vue-select'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import {createDisplayName, getBirthYear, getDeathYear } from '/utils/personHelper';

export default {
  layout: "auth",
  meta: {
    title: "Fanchart - Show",
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
  }),
  methods: {
    async fetchData() {
      if(!this.selected_person.value) return
      let params = {start_id: this.selected_person.value, generation: this.generation.value }
      this.$axios
        .$get("/api/trees/show", { params: params })
        .then((res) => {
          this.data = res;
          this.familyData = this.checkFamilyData();
          const fanChart = new FanChart("#webtrees-fan-chart-container", {
            labels: {
              zoom: "Use Ctrl + scroll to zoom in the view",
              move: "Move the view with two fingers",
            },
            defaultColor: "#0000FF",
            fanDegree: 360,
            fontColor: "#000",
            generations: 1,
            rtl: "rtl",
            showColorGradients: true,
            showEmptyBoxes: true,
            treeLayout: "right",
          });
          fanChart.draw(this.familyData);
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

    getPersons() {
      this.isLoading = true;
      this.$axios
        .$get("/api/persons")
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
      if(!childIds.length) return;
      this.data.persons[id].own_unions?.forEach((union) => {
        this.data.unions[union]?.children.forEach((childId) => {
          let person = this.data.persons[childId]
          children.push({
            id: person.id,
            name: person.name,
            title: person.titl,
            firstNames:[person.name],
            lastNames:[''],
            generation: person.generation,
            sex: person.sex ? person.sex : "M",
            xref : 1,
            birth: person.birthday ? person.birthday : person.birth_year,
            death: person.deathday ? person.deathday : person.death_year,
            timespan: this.checkBirthDeathDate(person.birthday ? person.birthday : person.birth_year, person.deathday ? person.deathday : person.death_year),
            children: this.checkChildren(childId)
          })
        })
      })
      return children;
    },

    checkParents(id) {
      const parents = [];
      const person = this.data.persons[id]

      console.log("data: ", this.data);

      const unionsArr = Object.values(this.data.unions);
      const families = unionsArr.filter(union => {
        const children = union.children;
        let isChild = false;
        children.forEach(child => {
          if (child == id) isChild = true;
        })
        return isChild;
      });

      // console.log("families: ", families, this.data.unions, id);
      families.forEach(family => {
        // console.log("family: ", family);
        family.partner?.forEach(parentId => {
          const person = this.data.persons[parentId];
          parents.push({
            id: person.id,
            name: person.name,
            title: person.titl,
            firstNames: [createDisplayName(person)],
            lastNames: [''],
            generation: person.generation,
            sex: person.sex ? person.sex : "M",
            xref: 1,
            birth: getBirthYear(person),
            death: getDeathYear(person),
            timespan: this.checkBirthDeathDate(person.birthday ? person.birthday : person.birth_year, person.deathday ? person.deathday : person.death_year),
            thumbnail: person.sex ? person.sex == 'F' ? this.thumbnail_woman : this.thumbnail_man : thumbnail_middle,
            children: this.checkParents(parentId),
          })
        })
      })

      // console.log("parents: ", parents);
      return parents.length == 0 ? null : parents
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
        birth: person.birthday ? person.birthday : person.birth_year,
        death: person.deathday ? person.deathday : person.death_year,
        timespan: this.checkBirthDeathDate(person.birthday ? person.birthday : person.birth_year, person.deathday ? person.deathday : person.death_year),
        children: this.checkParents(this.data.start)
      }
    },
  },

  mounted() {
    this.getPersons();
  },
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