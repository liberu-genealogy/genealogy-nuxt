<template>
  <v-app>
    <loading
      :active.sync="isLoading"
      :color="color"
      :background-color="backgroundColor"
    >
    </loading>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column is-12">
        <h1 class="is-size-4 has-text-black">
          <span class="has-text-weight-medium"
            >Hi {{ loggedInUser.person.name }}</span
          >, <span class="has-text-weight-light"> Welcome Back!</span>
        </h1>
      </div>
      <div class="column is-12">
        <nav class="breadcrumb mt-1 mb-0" aria-label="breadcrumbs">
          <ul>
            <li>
              <a
                class="is-size-7 has-text-weight-medium has-text-link"
                href="/dashboard"
                >Home</a
              >
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
            <v-select
              v-model="apiSelected"
              :items="apiList"
              label="API"
              hide-details="true"
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
              label="First name"
              hide-details="true"
              v-model="filter.firstName"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Last name"
              hide-details="true"
              v-model="filter.lastName"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="filter.date"
                  label="Date"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.date"
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-btn @click="search" block>Search</v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="result || []"
        :options.sync="options"
        :server-items-length="totalCount"
        :loading="loading"
        class="elevation-1"
      ></v-data-table>
    </v-card>
    <div class="columns is-variable is-3 is-desktop">
      <div class="column">
        <div class="card has-background-white has-text-black">
          <div class="card-content is-flex jc--sb">
            <img src="~assets/images/gedcom.svg" alt="" />
            <div class="has-text-right">
              <p class="is-size-4 has-text-weight-semibold">
                {{ peoplesattached }}
              </p>
              <div class="is-size-7 has-text-black has-text-weight-medium mt-1">
                        <NuxtLink
              to="gedcom.index"
              class="
                button
                is-size-7 is-uppercase
                has-text-weight-medium has-text-primary
                is-light
                mt-4
              "
              >GEDCOM Imports
		</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card has-background-white has-text-black">
          <div class="card-content is-flex jc--sb">
            <img src="~assets/images/families.svg" alt="" />
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
            <img src="~assets/images/peoples.svg" alt="" />
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
        <div class="card has-background-white has-text-black">
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
        </div>
      </div>
      <div class="column is-4-desktop is-6-tablet is-flex">
        <div class="card has-background-white has-text-black">
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
                <span
                  class="is-size-7 has-text-dark has-text-weight-regular mt-1"
                >
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
                <span
                  class="is-size-7 has-text-dark has-text-weight-regular mt-1"
                >
                  on 15th Sep, 2020 at 23:20 pm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4-desktop is-6-tablet is-flex">
        <div class="card has-background-white has-text-black">
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
                <span
                  class="is-size-7 has-text-dark has-text-weight-regular mt-1"
                >
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
                <span
                  class="is-size-7 has-text-dark has-text-weight-regular mt-1"
                >
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
        <div
          v-if="loggedInUser.role.name == 'free'"
          class="card has-background-primary has-text-centered"
        >
          <div class="card-content">
            <p class="is-size-7">Buy Plan</p>
            <NuxtLink
              to="subscription"
              class="
                button
                is-size-7 is-uppercase
                has-text-weight-medium has-text-primary
                is-light
                mt-4
              "
              >Subscribe</NuxtLink
            >
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
            <NuxtLink
              to="subscription"
              class="
                button
                is-size-7 is-uppercase
                has-background-white has-text-weight-medium has-text-primary
                is-light
                mt-4
              "
              >Upgrade Plan
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="column is-4-desktop is-6-tablet is-flex">
        <div class="card has-background-white has-text-black">
          <div class="card-content has-text-centered py-5">
            <div v-if="changedb == true" class="notification is-success">
              Changed Tree successfully!
            </div>
            <div v-if="changedb == false" class="notification is-danger">
              Somthing Wrong!
            </div>
            <label>Select Company</label>
            <vue-select
              label="name"
              v-model="selected_company"
              :reduce="(company) => company.id"
              :options="companies"
              @input="setSelectedCompany"
            ></vue-select>
            <label>Select Tree</label>
            <vue-select
              label="name"
              v-model="selected_tree"
              :reduce="(tree) => tree.id"
              :options="trees"
              @input="setSelected"
            ></vue-select>
            <font-awesome-icon
              :icon="['fas', 'user-circle']"
              class="has-text-primary mb-5"
              style="font-size: 55px"
            />
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
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters, mapActions } from 'vuex'
import PieChart from '../components/charts/PieChart'
export default {
  layout: 'auth',
  components: {
    Loading,
    PieChart,
  },
  inject: ['errorHandler', 'route', 'toastr'],
  //middleware: ['permission', 'verification'],
  meta: {
    permission: { name: 'dashboard menu' },
    title: 'Dashboard',
  },
  data() {
    return {
      loaded: false,
      trees: [],
      companies: [],
      selected_company: null,
      selected_tree: null,
      isLoading: false,
      fullPage: true,
      color: '#4fcf8d',
      changedb: null,
      backgroundColor: '#ffffff',
      trial: null,
      familiesjoined: 0,
      peoplesattached: 0,
      pieChartData: null,
      chartOptions: null,
      apiList: ['Geneanum', 'Open arch', 'Family search', 'Wikitree'],
      apiSelected: 'Geneanum',
      dateMenu: false,
      filter: {
        firstName: '',
        lastName: '',
        date: '',
      },
      totalCount: 0,
      result: null,
      loading: true,
      options: {},
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    headers() {
      if (this.apiSelected == 'Geneanum')
        return [
          { text: 'ID', value: 'identifier', sortable: false },
          { text: 'PID', value: 'pid', sortable: false },
          { text: 'Name', value: 'personname', sortable: false },
          { text: 'Place', value: 'eventplace', sortable: false },
          { text: 'Type', value: 'eventtype', sortable: false },
          { text: 'Archive', value: 'archive', sortable: false },
        ]
      else if (this.apiSelected == 'Open arch')
        return [
          { text: 'ID', value: 'identifier', sortable: false },
          { text: 'PID', value: 'pid', sortable: false },
          { text: 'Name', value: 'personname', sortable: false },
          { text: 'Place', value: 'eventplace', sortable: false },
          { text: 'Type', value: 'eventtype', sortable: false },
          { text: 'Archive', value: 'archive', sortable: false },
        ]
      else if (this.apiSelected == 'Family search')
        return [
          { text: 'ID', value: 'identifier', sortable: false },
          { text: 'PID', value: 'pid', sortable: false },
          { text: 'Name', value: 'personname', sortable: false },
          { text: 'Place', value: 'eventplace', sortable: false },
          { text: 'Type', value: 'eventtype', sortable: false },
          { text: 'Archive', value: 'archive', sortable: false },
        ]
      else if (this.apiSelected == 'Wikitree')
        return [
          { text: 'ID', value: 'identifier', sortable: false },
          { text: 'PID', value: 'pid', sortable: false },
          { text: 'Name', value: 'personname', sortable: false },
          { text: 'Place', value: 'eventplace', sortable: false },
          { text: 'Type', value: 'eventtype', sortable: false },
          { text: 'Archive', value: 'archive', sortable: false },
        ]
    },
  },
  watch: {
    options: {
      handler() {
        console.log(this.loading, this.options)
        this.search()
      },
      deep: false,
    },
  },
  methods: {
    setSelectedCompany(value) {
      this.selected_tree = null
      this.getTree()
    },
    async setSelected(value) {
      const response = this.$axios.$post('/api/dashboard/changedb', {
        company_id: this.selected_company,
        tree_id: this.selected_tree,
      })
      this.loadChart()
      this.changedb = response.changedb
    },
    async getCompanies() {
      const response = await this.$axios.$get('/api/get_companies')
      this.companies = response
      this.companies.map((company) => {
        if (company.is_tenant == 1) {
          this.selected_company = company.id
          this.getTree()
        }
      })
    },
    async getTree() {
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
    },
    async loadChart() {
      this.loaded = false
      const chartResponse = await this.$axios.get('/api/dashboard/pie')
     // const { data: trial } = await this.$axios.get('/api/dashboard/trial')
      this.pieChartData = chartResponse.data
      this.chartOptions = chartResponse.options
      //this.familiesjoined = data.familiesjoined
      //this.peoplesattached = data.peoplesattached
      this.loaded = true
      this.isLoading = false
      //this.trial = trial
    },
    search() {
      //this.result = null
      this.loading = true
      let url = '',
        params = {}
      if (this.apiSelected == 'Geneanum') {
        url = '/api/geneanum/search-person/malta/burials'
      } else if (this.apiSelected == 'Open arch') {
        url = '/api/open-arch/search-person'
        params = {
          name:
            (this.filter.firstName || '') + ' ' + (this.filter.lastName || ''),
          per_page: this.options?.itemsPerPage || 10,
          page: this.options?.page || 1,
        }
      } else if (this.apiSelected == 'Family search') {
        url = '/api/family-search/search'
        params = {
          givenName: this.filter.firstName || '',
          surname: this.filter.lastName || '',
          count: this.options?.itemsPerPage || 10,
          offset:
            ((this.options?.page || 1) - 1) *
            (this.options?.itemsPerPage || 10),
        }
      } else if (this.apiSelected == 'Wikitree') {
        url = '/api/wikitree/search-person'
        params = {
          FirstName: this.filter.firstName || '',
          LastName: this.filter.lastName || '',
          per_page: this.options?.itemsPerPage || 10,
          page: this.options?.page || 1,
        }
      }
      this.$axios
        .get(url, {
          params: params,
        })
        .then(({ data }) => {
          this.result = data.response.docs
          this.totalCount = data.response.number_found
          this.loading = false
        })
        .catch(this.errorHandler)
    },
  },
  created() {
    this.getCompanies()
  },
}
</script>
