<template>
  <div>
    <loading :active="isLoading" :color="color" :background-color="backgroundColor" />
    <div class="select-box">
      <v-select style="width: 100%" v-model="selected_person"
        :options="persons.map(item => item = { label: item.displayname, value: item.id })" @input="fetchData" />
      <v-select style="width: 100px" v-model="generation"
        :options="Array.from(Array(10).keys()).map(item => item = { label: item, value: item })" @input="fetchData" />
    </div>
    <div style="min-height: 700px; padding: 20px 8px;" id="webtrees-pedigree-chart-container">
    <div v-for="data in reportLevels">
      <div :style="`margin: 8px 6px 8px ${data.level * 42}px; display: flex`">
        <span :style="`width: ${(data.level * 5) + 20}px;`">{{data.label}}</span> 
        <span>{{ data.person.firstNames }}</span>
      </div>
      <div v-if="data.person.spouse && data.person.children" :style="`margin: 8px 0px 16px ${(data.level * 42)}px; display: flex`">
        <span :style="`padding: 0 8px 0px ${(data.level * 5) + 20}px`">sp</span> 
        <span>{{ data.person.spouse.firstNames }}</span>
      </div>
    </div>
    </div>
  </div>
</template>
<router>
{
  name: 'reports.descendant'
}
</router>


<script>


import { EnsoTable } from "@enso-ui/tables/bulma";
import { PedigreeChart } from "/assets/js/pedigree-chart/modules/index";
import Loading from 'vue-loading-overlay'
import vSelect from 'vue-select'
import style from '/assets/css/svg.css'
import {createDisplayName, getBirthYear, getDeathYear } from '/utils/personHelper';
export default {
  layout: "auth",
  meta: {
    permission: { name: "reports menu" },
    title: "Reports - d'Aboville",
  },
  data: () => ({
    familyData: {},
    // reportLevels: [],
    persons: [],
    generation: { label: 1, value: 1 },
    selected_person: {},
    data: {},
    isLoading: false,
    color: '#4fcf8d',
    backgroundColor: '#ffffff',
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

    getSpouse(id) {
      const own_union = this.data.persons[id].own_unions;
      if (!own_union || !own_union.length) return null;
      const union = own_union[0];
      const spouse_id = this.data.unions[union]?.partner.find(i => i != id);
      const person = this.data.persons[spouse_id];
      if (!person) return null;
      return {
        id: person.id,
        name: person.name,
        title: person.titl,
        firstNames:createDisplayName(person),
        lastNames:[''],
        generation: person.generation,
        sex: person.sex ? person.sex : "M",
        xref : 1,
        birth: getBirthYear(person),
        death: getDeathYear(person),
        timespan: this.checkBirthDeathDate(person.birthday ? person.birthday : person.birth_year, person.deathday ? person.deathday : person.death_year),
        thumbnail : person.sex ? person.sex == 'F' ? this.thumbnail_woman : this.thumbnail_man : thumbnail_middle,      
      };
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
      this.data.persons[id].own_unions?.forEach((union, idx) => {
        if (idx > 3) return children;
        this.data.unions[union]?.children.forEach((childId) => {
          let person = this.data.persons[childId]
          children.push({
            id: person.id,
            name: person.name,
            title: person.titl,
            firstNames:createDisplayName(person),
            lastNames:[''],
            generation: person.generation,
            sex: person.sex ? person.sex : "M",
            spouse: this.getSpouse(person.id),
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
        firstNames:createDisplayName(person),
        lastNames:[''],
        generation: person.generation,
        sex: person.sex ? person.sex : "M",
        spouse: this.getSpouse(person.id),
        xref : 1,
        birth: getBirthYear(person),
        death: getDeathYear(person),
        timespan: this.checkBirthDeathDate(person.birthday ? person.birthday : person.birth_year, person.deathday ? person.deathday : person.death_year),
        thumbnail : person.sex ? person.sex == 'F' ? this.thumbnail_woman : this.thumbnail_man : thumbnail_middle,
        children: this.checkChildren(this.data.start)
      }
    },
    async fetchData() {
      if (!this.selected_person.value) return;
      let params = { start_id: this.selected_person.value, generation: this.generation.value }
      this.$axios
      .$get("/api/reports/descendant", { params: params })
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
    },   
  
 
  reportLevels() {
    let reportLevels = [];

    const traverse = (data, level = 1, label = "") => {
    const levellabel = level == 1 ? label : `${label}.`;
      data.forEach((person, index) => {
        const currentLabel = `${levellabel}${index + 1}`;
        const reportData = {
          level,
          label: currentLabel,
          person,
        };

        reportLevels.push(reportData);

        if (person.children && person.children.length > 0) {
          traverse(person.children, level + 1, currentLabel);
        }
      });
    };

    // console.log("familyData: ", );
    if (Object.keys(this.familyData).length > 0)
      traverse([this.familyData], 1);

    return reportLevels;
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
