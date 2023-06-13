<template>
  <div>
    <loading :active="isLoading" :color="color" :background-color="backgroundColor" />
    <div class="select-box">
      <v-select style="width: 100%" v-model="selected_person"
        :options="persons.map(item => item = { label: item.displayname, value: item.id })" @input="fetchData" />
      <v-select style="width: 100px" v-model="generation"
        :options="Array.from(Array(10).keys()).map(item => item = { label: item, value: item })" @input="fetchData" />
    </div>
    <div style="min-height: 700px; padding: 20px 8px;" id="webtrees-pedigree-chart-container"></div>
  </div>
</template>
<router>
{
  name: 'reports.ahnentafel'
}
</router>

<script>


import { EnsoTable } from "@enso-ui/tables/bulma";
import Loading from 'vue-loading-overlay'
import vSelect from 'vue-select'
import style from '/assets/css/svg.css'
import {createDisplayName, getBirthYear, getDeathYear } from '/utils/personHelper';
export default {
  layout: "auth",
  meta: {
    permission: { name: "reports menu" },
    title: "Reports - Ahnentafel",
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
  components: {
    EnsoTable,
    Loading,
    vSelect
  },
  methods: {
    checkBirthDeathDate(birth, death) {
      if (death) {
        if (!birth) return ""
        return `${birth.toString().slice(0, 4)}-${death.toString().slice(0, 4)}`
      } else {
        if (!birth) return ""
        return `Born ${birth.toString().slice(0, 4)}`
      }
    },

    checkParents(id) {
      const parents = [];
      const person = this.data.persons[id];
      const unionsArr = Object.values(this.data.unions);
      const families = unionsArr.filter(union => {
        const children = union.children;
        let isChild = false;
        children.forEach(child => {
          if (child == id) isChild = true;
        })
        return isChild;
      });

      families.forEach(family => {
        family.partner?.forEach(parentId => {
          if (!parentId) return;
          const person = this.data.persons[parentId];
          if (!person) return;
          console.log("person: ", person, person.id);
          const parent = this.checkParents(parentId);
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
            parents: !!parent ? parent : null ,
          })
        })
      })

      return parents.length == 0 ? null : parents
    },

    checkFamilyData(id = null) {     
      const person = id ? this.data.persons[id] : this.data.persons[this.data.start]
      const data = {
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
        thumbnail: person.sex ? person.sex == 'F' ? this.thumbnail_woman : this.thumbnail_man : this.thumbnail_man,
        parents: this.checkParents(this.data.start),
      }
      return data;
    },
    async fetchData() {
      if (!this.selected_person.value) return;
      let params = { start_id: this.selected_person.value, generation: this.generation.value }
      this.$axios
        .$get("/api/reports/ahnentafel", { params: params })
        .then((res) => {
          this.data = res;
          this.familyData = this.checkFamilyData();
          console.log("familyData: ", this.familyData);
          
        });
    },

    getPersons() {
      this.isLoading = true
      this.$axios
        .$get("/api/persons")
        .then((res) => {
          this.persons = res.map(person => {
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
