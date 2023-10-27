<template>
  <v-app>
    <loading :active.sync="isLoading" :color="color" :background-color="backgroundColor">
    </loading>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column is-12">
        <h1 class="is-size-4 has-text-black">
          <span class="has-text-weight-medium">Hi {{ loggedInUser.person.name }}</span>, <span
            class="has-text-weight-light"> Welcome Back!</span>
        </h1>
      </div>
      <div class="column is-12">
        <nav class="breadcrumb mt-1 mb-0" aria-label="breadcrumbs">
          <ul>
            <li>
              <a class="is-size-7 has-text-weight-medium has-text-link" href="/dashboard">Home</a>
            </li>
            <li class="is-size-7 has-text-weight-medium is-active">
              <a href="/dashboard" aria-current="page">Dashboard</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <v-card outlined shaped>
      <v-card-title>Search</v-card-title>
      <v-toolbar flat>
        <v-row>
          <v-col>
            <v-select v-model="apiSelected" :items="apiList" label="API" hide-details="true"></v-select>
          </v-col>
          <v-col>
            <v-text-field
                label="First name"
                hide-details="true"
                v-model="filter.firstName"
                @keydown="searchInputKeydown"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                label="Last name"
                hide-details="true"
                v-model="filter.lastName"
                @keydown="searchInputKeydown"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
              offset-y>
              <template v-slot:activator="{ on }">
                <v-text-field v-model="filter.date" label="Date" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="filter.date" @input="dateMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-btn @click="search" block>Search</v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-data-table :headers="headers" :items="result || []" :options.sync="options" :server-items-length="totalCount"
        :loading="loading" class="elevation-1"></v-data-table>
    </v-card>
    <div class="columns mt-3 is-variable is-3 is-desktop">
      <div class="column">
        <div class="card has-background-white has-text-black">
          <div class="card-content is-flex jc--sb">
            <img src="~assets/images/gedcom.svg" alt="" class="dash-icon" />
            <div class="has-text-right">
              <p class="is-size-4 has-text-weight-semibold">
                {{ peoplesattached }}
              </p>
              <div class="is-size-7 has-text-black has-text-weight-medium mt-1">
                <NuxtLink to="/gedcom" class="
                          button
                          is-size-7 is-uppercase
                          has-text-weight-medium has-text-primary
                          is-light
                          mt-4
                        ">GEDCOM Import
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card has-background-white has-text-black">
          <div class="card-content is-flex jc--sb">
            <img src="~assets/images/families.svg" alt="" class="dash-icon" />
            <div class="has-text-right">
              <p class="is-size-4 has-text-weight-semibold">
                {{ familiesjoined }}
              </p>
              <div class="is-size-7 has-text-black has-text-weight-medium mt-1">
                Families Joined
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card has-background-white has-text-black">
          <div class="card-content is-flex jc--sb">
            <img src="~assets/images/peoples.svg" alt="" class="dash-icon" />
            <div class="has-text-right">
              <p class="is-size-4 has-text-weight-semibold">
                {{ peoplesattached }}
              </p>
              <div class="is-size-7 has-text-black has-text-weight-medium mt-1">
                Peoples Attached
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-variable">
      <div class="column is-4-desktop is-6-tablet is-flex">
        <!-- <div class="card has-background-white has-text-black">
          <div class="card-header">
            <div class="card-header-title has-text-black">Genders</div>
          </div>
          <div class="card-content" style="height: 400px">
            <Piechart
            	v-if="loaded"
              :data="pieChartData"
              :options="chartOptions"
              :height="300"
            />
          </div>
        </div> -->
        <chart-card class="is-rounded w-100 raises-on-hover has-background-white has-text-black has-margin-bottom-large"
          source="/api/dashboard/pie" />
      </div>
      <div class="column is-4-desktop is-6-tablet is-flex">
        <div class="card w-100 has-background-white has-text-black">
          <div class="card-header">
            <div class="card-header-title has-text-black">Activity</div>
          </div>
          <div class="card-content">
            <div class="card_list is-flex">
              <div class="icon_box is-flex jc--c ai--c">
                <i class="fas fa-users has-text-white is-size-6"></i>
              </div>
              <div class="is-flex fd--c ml-3">
                New Column added
                <span class="is-size-7 has-text-dark has-text-weight-regular mt-1">
                  on 15th Sep, 2020 at 23:20 pm
                </span>
              </div>
            </div>
            <div class="card_list is-flex">
              <div class="icon_box is-flex jc--c ai--c">
                <i class="fas fa-lock has-text-white is-size-6"></i>
              </div>
              <div class="is-flex fd--c ml-3">
                Password Changed
                <span class="is-size-7 has-text-dark has-text-weight-regular mt-1">
                  on 15th Sep, 2020 at 23:20 pm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4-desktop is-6-tablet is-flex">
        <div class="card w-100 has-background-white has-text-black">
          <div class="card-header">
            <div class="card-header-title has-text-black">Files</div>
          </div>
          <div class="card-content">
            <div class="card_list is-flex">
              <div class="icon_box is-flex jc--c ai--c">
                <i class="fas fa-file-excel has-text-white is-size-6"></i>
              </div>
              <div class="is-flex fd--c ml-3">
                File_22012020.xlsx
                <span class="is-size-7 has-text-dark has-text-weight-regular mt-1">
                  on 15th Sep, 2020 at 23:20 pm
                </span>
              </div>
            </div>
            <div class="card_list is-flex">
              <div class="icon_box is-flex jc--c ai--c">
                <i class="fas fa-file-excel has-text-white is-size-6"></i>
              </div>
              <div class="is-flex fd--c ml-3">
                Tree_Table_Report.xlsx
                <span class="is-size-7 has-text-dark has-text-weight-regular mt-1">
                  on 15th Sep, 2020 at 23:20 pm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-variable is-flex-desktop-only ai--s">
      <div class="column is-4-desktop is-6-tablet is-flex">
        <div v-if="loggedInUser.role.name == 'free'" class="card has-background-primary has-text-centered">
          <div class="card-content">
            <p class="is-size-7">Buy Plan</p>
            <NuxtLink to="/subscription" class="
                          button
                          is-size-7 is-uppercase
                          has-text-weight-medium has-text-primary
                          is-light
                          mt-4
                        ">Subscribe</NuxtLink>
          </div>
        </div>
        <div v-else class="card has-background-primary has-text-white">
          <div class="card-content">
            <p class="is-size-7">Your Plan Expires in</p>
            <p class="is-size-4 mb-2 has-text-weight-medium">
              {{ trial ? trial.days : '' }} Days
            </p>
            <p class="is-size-7">
              Upgrade your plan &amp; join nearly 100 people who have already
              registered.
            </p>
            <NuxtLink to="subscription" class="
                          button
                          is-size-7 is-uppercase
                          has-background-white has-text-weight-medium has-text-primary
                          is-light
                          mt-4
                        ">Upgrade Plan
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="column is-4-desktop is-6-tablet is-flex">
        <div class="card w-100 has-background-white has-text-black">
          <div class="card-content has-text-centered py-5">
            <div v-if="changedb == true" class="notification is-success">
              Changed Tree successfully!
            </div>
            <div v-if="changedb == false" class="notification is-danger">
              Somthing Wrong!
            </div>
            <label>Select Company</label>
            <vue-select label="name" v-model="selected_company" :reduce="(company) => company.id" :options="companies"
              @input="setSelected"></vue-select>
            <!--            <vue-select-->
            <!--                label="name"-->
            <!--                v-model="selected_company"-->
            <!--                :reduce="(company) => company.id"-->
            <!--                :options="companies"-->
            <!--                @input="setSelectedCompany"-->
            <!--            ></vue-select>-->
            <!--            <label>Select Tree</label>-->
            <!--            <vue-select-->
            <!--              label="name"-->
            <!--              v-model="selected_tree"-->
            <!--              :reduce="(tree) => tree.id"-->
            <!--              :options="trees"-->
            <!--              @input="setSelected"-->
            <!--            ></vue-select>-->
            <font-awesome-icon :icon="['fas', 'user-circle']" class="has-text-primary mb-5 mt-2"
              style="font-size: 55px" />
            <p class="is-size-7 mb-2 has-text-weight-medium">
              {{ loggedInUser.email }}
            </p>
            <p class="is-size-7 mb-4 has-text-weight-medium">
              {{ loggedInUser.person.name }}
            </p>
            <p class="is-size-7 is-uppercase">Use Tree</p>
          </div>
        </div>
      </div>
      <div class="column is-4-desktop is-6-tablet is-flex">
        <div class="card w-100 has-background-white has-text-black">
          <div class="card-content has-text-centered py-5">
            <div v-if="changedb == true" class="notification is-success">
              Changed Tree successfully!
            </div>
            <div v-if="changedb == false" class="notification is-danger">
              Somthing Wrong!
            </div>
            <label>Invited Company</label>
            <vue-select label="name" v-model="invited_company" :reduce="(company) => company.id"
              :options="invited_companies" @input="setSelected"></vue-select>
            <font-awesome-icon :icon="['fas', 'user-circle']" class="has-text-primary mb-5 mt-2"
              style="font-size: 55px" />
            <p class="is-size-7 mb-2 has-text-weight-medium">
              {{ loggedInUser.email }}
            </p>
            <p class="is-size-7 mb-4 has-text-weight-medium">
              {{ loggedInUser.person.name }}
            </p>
            <p class="is-size-7 is-uppercase">Use Tree</p>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<router>
{
name: 'dashboard.index'
}
</router>
<script setup>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters, mapActions } from 'vuex'
import PieChart from '../components/charts/PieChart'
import { EnsoChartCard as ChartCard } from '@enso-ui/charts/bulma';
import { Chart, colors } from '@enso-ui/charts';

  // layout: 'auth',
  // inject: ['errorHandler', 'route', 'toastr'],
  //middleware: ['permission', 'verification'],
  // meta: {
  //   permission: { name: 'dashboard menu' },
  //   title: 'Dashboard',
  // },

  const errorHandler = inject('errorHandler')
  const route = inject('route')
  const toastr = inject('toastr')
  const loaded = ref(false)
  const trees = ref([])
  const companies = ref([])
  const invited_companies = ref([])
  const selected_company = ref(null)
  const invited_company = ref(null)
  const selected_tree = ref(null)
  const isLoading = ref(false)
  const fullPage = ref(true)
  const color = '#4fcf8d'
  const changedb = ref(null)
  const backgroundColor = '#ffffff'
  const trial = ref(null)
  const familiesjoined = ref(0)
  const peoplesattached = ref(0)
  const pieChartData = ref(null)
  const chartOptions = ref(null)
  const apiList = ref(['Member tree', 'Open arch', 'Wikitree', 'Family search', 'UK national arch', 'Genealogy cloud'])  
  const apiSelected = ref('Member tree')
  const dateMenu = ref(false)
  const filter = reactive({
         firstName: '',
         lastName: '',
         date: '',
       })
  const totalCount = ref(0)
  const result = ref(null)
  const options = ref({})     
  const headers = computed(()=> {
         if (apiSelected.value === 'Geneanum')
         return [
           { text: 'ID', value: 'identifier', sortable: false },
           { text: 'PID', value: 'pid', sortable: false },
           { text: 'Name', value: 'personname', sortable: false },
           { text: 'Place', value: 'eventplace', sortable: false },
           { text: 'Type', value: 'eventtype', sortable: false },
           { text: 'Archive', value: 'archive', sortable: false },
         ]
         else if (apiSelected.value === 'Open arch')
         return [
           { text: 'ID', value: 'identifier', sortable: false },
           { text: 'PID', value: 'pid', sortable: false },
           { text: 'Name', value: 'personname', sortable: false },
           { text: 'Event Place', value: 'eventplace', sortable: false },
           { text: 'Event Type', value: 'eventtype', sortable: false },
           { text: 'Date', value: 'eventdate.year', sortable: false },
           { text: 'Relation Type', value: 'relationtype', sortable: false },
           { text: 'Source Type', value: 'sourcetype', sortable: false },
           { text: 'Archive', value: 'archive', sortable: false },
           { text: 'Code', value: 'archive_code', sortable: false },
           { text: 'Org', value: 'archive_org', sortable: false }     
         ]
       else if (apiSelected.value === 'Family search')
        return [
          { text: 'ID', value: 'identifier', sortable: false },
          { text: 'PID', value: 'pid', sortable: false },
          { text: 'Name', value: 'personname', sortable: false },
          { text: 'Place', value: 'eventplace', sortable: false },
          { text: 'Type', value: 'eventtype', sortable: false },
          { text: 'Archive', value: 'archive', sortable: false },
        ]
      else if (apiSelected.vale === 'Member tree')
        return [
          { text: 'ID', value: 'id', sortable: false },
          { text: 'Name', value: 'name', sortable: false },
          { text: 'User', value: 'user_name', sortable: false },
        ]
      else if (apiSelected.vale === 'Wikitree')
        return [
          { text: 'ID', value: 'identifier', sortable: false },
          { text: 'PID', value: 'pid', sortable: false },
          { text: 'Name', value: 'personname', sortable: false },
          { text: 'Place', value: 'eventplace', sortable: false },
          { text: 'Type', value: 'eventtype', sortable: false },
          { text: 'Archive', value: 'archive', sortable: false },
        ]
      else if (apiSelected.vale === 'UK national arch')
        return [
          { text: 'ID', value: 'id', sortable: false },
          { text: 'Title', value: 'title', sortable: false },
          { text: 'Context', value: 'context', sortable: false },
          { text: 'Covering Dates', value: 'coveringDates', sortable: false },
          { text: 'Department', value: 'department', sortable: false },
          { text: 'Description', value: 'description', sortable: false },
          { text: 'startDate', value: 'startDate', sortable: false },
          { text: 'End Date', value: 'endDate', sortable: false },
          { text: 'Reference', value: 'reference', sortable: false }
        ]
      else if (apiSelected.vale === 'Genealogy cloud')
        return [
          { text: 'ID', value: 'identifier', sortable: false },
          { text: 'PID', value: 'pid', sortable: false },
          { text: 'Name', value: 'personname', sortable: false },
          { text: 'Event Place', value: 'eventplace', sortable: false },
          { text: 'Event Type', value: 'eventtype', sortable: false },
          { text: 'Date', value: 'eventdate.year', sortable: false },
          { text: 'Relation Type', value: 'relationtype', sortable: false },
          { text: 'Source Type', value: 'sourcetype', sortable: false },
          { text: 'Archive', value: 'archive', sortable: false },
          { text: 'Code', value: 'archive_code', sortable: false },
          { text: 'Org', value: 'archive_org', sortable: false },

        ]
      })

      const loggedInUser = computed(()=> mapGetters(['loggedInUser']))

  // watch: {
  //   options: {
  //     handler() {
  //       console.log(this.loading, this.options)
  //       this.search()
  //     },
  //     deep: false,
  //   },
  // },
 
  function  searchInputKeydown(event) {
        options.value.page = 1;
        if (event.keyCode == 13) {
            search();
        }
    }
    function setSelectedCompany(value) {
      selected_tree.value = null
      getTree()
    }

    async function setSelected(value) {
      const response = await this.$axios.$post('/api/dashboard/changedb', {
        company_id: value,
      })
      loadChart()
      changedb.value = response.changedb
      familiesjoined.value = response.familiesjoined
      peoplesattached.value = response.peoplesattached
    }
    async function getCompanies() {
      const response = await this.$axios.$get('/api/get_companies')
      companies.value = response.my_comps;
      invited_companies.value = response.invited_comps;
      companies.value.map((company) => {
        // console.log('this.loggedInUser.id',this.start_id+' ==' +company.id);
        if (company.is_tenant == 1 && company.email === loggedInUser.email) {
          selected_company.value = company.id
          getTree()
        }
      })
    }
    async function  getTree() {
      this.selected_tree = null
      const response = await this.$axios.$get('/api/trees/show', {
        params: { start_id: this.selected_company, nest: 3 },
      })
      this.trees = Object.values(response.persons)
      this.trees.map((tree) => {
        if (tree.current_tenant == 1) {
          this.selected_tree = tree.id
        }
      })
    }
    async function loadChart() {
      loaded.value = false
      const chartResponse = await this.$axios.get('/api/dashboard/pie')
    
      pieChartData.value = chartResponse.data
      chartOptions.value = chartResponse.options

      loaded.value = true
      isLoading.value = false
     
    }

    function search() {
     
      loading.value = true
      let url = '',
        params = {}
      if (apiSelected.value === 'Geneanum') {
        url = '/api/geneanum/search-person/malta/burials'
        params = {
          FirstName: filter.firstName || '',
          LastName: filter.lastName || '',
          per_page: options?.itemsPerPage || 10,
          page: options?.page || 1,
          sidx: options?.sidx || 100,
          row: options?.row || 100,
        }
      } else if (apiSelected.value === 'Open arch') {
        url = '/api/open-arch/search-person'
        params = {
          name:
            (filter.firstName || '') + ' ' + (filter.lastName || '') + ' ' + (filter.date || ''),
          per_page: options?.itemsPerPage || 10,
          page: options?.page || 1,
        }
      } else if (apiSelected.value == 'Member tree') {
        url = '/api/member-tree/search-person'
        params = {
          name:
            (filter.firstName || '') + ' ' + (filter.lastName || '') + ' ' + (filter.date || ''),
          per_page: options?.itemsPerPage || 10,
          page: options?.page || 1,
        }
      } else if (apiSelected.value == 'Family search') {
        url = '/api/family-search/search'
        params = {
          givenName: filter.firstName || '',
          surname: filter.lastName || '',
          count: options?.itemsPerPage || 10,
          offset:
            ((options?.page || 1) - 1) *
            (options?.itemsPerPage || 10),
        }
      } else if (apiSelected.value == 'Wikitree') {
        url = '/api/wikitree/search-person'
        params = {
          FirstName: filter.firstName || '',
          LastName: filter.lastName || '',
          per_page: options?.itemsPerPage || 10,
          page: options?.page || 1,
        }
      } else if (apiSelected.value === 'UK national arch') {
        url = '/api/uk-national-arch/search-person'
        params = {
          firstName: filter.firstName || '',
          lastName: filter.lastName || '',
        }
      } else if (apiSelected.value === 'Genealogy cloud') {
        url = '/api/genealogy-cloud/search-person'
        params = {
          GivenNames: this.filter.firstName || '',
          Surname: this.filter.lastName || '',
        }
      }

      this.$axios
        .get(url, {
          params: params,
        })
        .then(({ data }) => {
          if (this.apiSelected == "UK national arch") {
            this.result = data.records;
            this.totalCount = data.records.length
          }
          else {
            this.result = data.response.docs
            this.totalCount = data.response.number_found
          }
          this.loading = false
        })
        .catch(this.errorHandler)
    }

    getCompanies()
  
</script>
