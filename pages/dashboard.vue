<template>
    <div>
        <loading :active.sync="isLoading" :color="color" :background-color="backgroundColor"> </loading>
        <div class="columns is-gapless is-multiline is-mobile">
            <div class="column is-12">
                <h1 class="is-size-4 has-text-black">
                    <span class="has-text-weight-medium">Hi {{ loggedInUser.person.name }}</span>, <span class="has-text-weight-light">
                        Welcome Back!</span>
                </h1>
            </div>
            <div class="column is-12">
                <nav class="breadcrumb mt-1 mb-0" aria-label="breadcrumbs">
                    <ul>
                        <li><a class="is-size-7 has-text-weight-medium has-text-link"
                                href="/dashboard">Home</a></li>
                        <li class="is-size-7 has-text-weight-medium is-active"><a href="/dashboard"
                                aria-current="page">Dashboard</a></li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="columns is-variable is-3 is-desktop">
            <div class="column">
                <div class="card has-background-white has-text-black">
                    <div class="card-content is-flex jc--sb">
                        <img src="~assets/images/gedcom.svg" alt="">
                        <div class="has-text-right">
                            <p class="is-size-4 has-text-weight-semibold">{{ peoplesattached }}</p>
                            <div class="is-size-7 has-text-black has-text-weight-medium mt-1">GEDCOM Imports
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card has-background-white has-text-black">
                    <div class="card-content is-flex jc--sb">
                        <img src="~assets/images/families.svg" alt="">
                        <div class="has-text-right">
                            <p class="is-size-4 has-text-weight-semibold">{{ familiesjoined }}</p>
                            <div class="is-size-7 has-text-black has-text-weight-medium mt-1">Families Joined
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card has-background-white has-text-black">
                    <div class="card-content is-flex jc--sb">
                        <img src="~assets/images/peoples.svg" alt="">
                        <div class="has-text-right">
                            <p class="is-size-4 has-text-weight-semibold">{{ peoplesattached }}</p>
                            <div class="is-size-7 has-text-black has-text-weight-medium mt-1">Peoples Attached
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
                        <div class="card-header-title has-text-black">
                            Genders
                        </div>
                    </div>
                    <div class="card-content" style="height: 400px;">
                        <pie-chart  v-if="loaded" :chartdata="pieChartData" :options="chartOptions" :height="300" />
                    </div>
                </div>
            </div>
            <div class="column is-4-desktop is-6-tablet is-flex">
                <div class="card has-background-white has-text-black">
                    <div class="card-header">
                        <div class="card-header-title has-text-black">
                            Activity
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card_list is-flex">
                            <div class="icon_box is-flex jc--c ai--c">
                                <i class="fas fa-users has-text-white is-size-6"></i>
                            </div>
                            <div class="is-flex fd--c ml-3">
                                New Column added
                                <span class="is-size-7 has-text-dark has-text-weight-regular mt-1"> on 15th Sep, 2020 at 23:20 pm </span>
                            </div>
                        </div>
                        <div class="card_list is-flex">
                            <div class="icon_box is-flex jc--c ai--c">
                                <i class="fas fa-lock has-text-white is-size-6"></i>
                            </div>
                            <div class="is-flex fd--c ml-3">
                                Password Changed
                                <span class="is-size-7 has-text-dark has-text-weight-regular mt-1"> on 15th Sep, 2020 at 23:20 pm </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-4-desktop is-6-tablet is-flex">
                <div class="card has-background-white has-text-black">
                    <div class="card-header">
                        <div class="card-header-title has-text-black">
                            Files
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card_list is-flex">
                            <div class="icon_box is-flex jc--c ai--c">
                                <i class="fas fa-file-excel has-text-white is-size-6"></i>
                            </div>
                            <div class="is-flex fd--c ml-3">
                                File_22012020.xlsx
                                <span class="is-size-7 has-text-dark has-text-weight-regular mt-1"> on 15th Sep, 2020 at 23:20 pm </span>
                            </div>
                        </div>
                        <div class="card_list is-flex">
                            <div class="icon_box is-flex jc--c ai--c">
                                <i class="fas fa-file-excel has-text-white is-size-6"></i>
                            </div>
                            <div class="is-flex fd--c ml-3">
                                Tree_Table_Report.xlsx
                                <span class="is-size-7 has-text-dark has-text-weight-regular mt-1"> on 15th Sep, 2020 at 23:20 pm </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-variable is-flex-desktop-only ai--s">
            <div class="column is-4-desktop is-6-tablet is-flex">
                <div v-if="loggedInUser.role.name == 'free'" class="card has-background-primary has-text-centered">
                    <div   class="card-content">
                        <p class="is-size-7">Buy Plan</p>
                        <NuxtLink to="subscription"
                            class="button is-size-7 is-uppercase has-text-weight-medium has-text-primary is-light mt-4">Subscribe</NuxtLink>
                    </div>
                </div>
                <div v-else class="card has-background-primary has-text-white">
                    <div class="card-content">
                        <p class="is-size-7">Your Plan Expires in</p>
                        <p class="is-size-4 mb-2 has-text-weight-medium">{{trial ? trial.days : ''}} Days</p>
                        <p class="is-size-7">Upgrade your plan &amp; join nearly 100 people who have already
                            registered.</p>
                        <NuxtLink to="subscription"
                            class="button is-size-7 is-uppercase has-background-white has-text-weight-medium has-text-primary is-light mt-4">Upgrade
                            Plan </NuxtLink>
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
                         <v-select label="name"  v-model="selected_company" :reduce="company => company.id" :options="companies" @input="setSelectedCompany"></v-select>
                        <label>Select Tree</label>
                         <v-select label="name"  v-model="selected_tree" :reduce="tree => tree.id" :options="trees" @input="setSelected"></v-select>
                        <font-awesome-icon :icon="['fas', 'user-circle']" class="has-text-primary mb-5" style="font-size: 55px;"/>
                        <p class="is-size-7 mb-2 has-text-weight-medium">{{ loggedInUser.email }}</p>
                        <p class="is-size-7 mb-4 has-text-weight-medium">{{ loggedInUser.person.name }}</p>
                        <p class="is-size-7 is-uppercase">Use Tree</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<router>
{
    name: 'dashboard.index'
}
</router>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapGetters, mapActions } from "vuex";
import PieChart from '../components/charts/PieChart';
export default {
    layout: 'auth',
    components: {
        Loading,
        PieChart
    },
    //middleware: ['permission', 'verification'],
    meta: {
        permission: { name: 'dashboard menu' },
        title: 'Dashboard'
    },
    data() {
        return {
            loaded: true,
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
            pieChartData: {
                datasets: [{
                    label: 'Data One',
                    data: [40,20,30],
                    backgroundColor: [
                        'rgba(79, 207, 141, 1)',
                        'rgba(251, 145, 58, 1)',
                        'rgba(244, 91, 21, 1)'
                    ],
                }],
                labels: [
                    'Male',
                    'Female',
                    'Other'
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
        }
    },
    computed: {
         ...mapGetters([
              'loggedInUser'])
    },
    methods: {
        setSelectedCompany(value) {
            this.selected_tree = null
            this.getTree();
        },
        async setSelected(value) {
            const response = this.$axios.$post("/api/dashboard/changedb", {
                            company_id : this.selected_company,
                            tree_id : this.selected_tree})
            this.loadChart()
            this.changedb = response.changedb
        },
        async getCompanies() {
            const response = await this.$axios.$get("/api/get_companies")
            this.companies = response
            this.companies.map((company) => {
                if(company.is_tenant == 1) {
                    this.selected_company = company.id
                    this.getTree()
                }
            })
        },
        async getTree() {
            this.selected_tree = null
            console.log('ok-tree',this.selected_company);
            const response = await this.$axios.$get("/api/trees/show",{
                params: { company_id : this.selected_company }
            })
            this.trees.push(response)
            this.trees.map((tree) => {
                if(tree.current_tenant == 1) {
                    this.selected_tree = tree.id
                }
            })
        },
        async loadChart() {
            this.loaded = false
            const { data: data } = await this.$axios.get("/api/dashboard");
            const { data: trial } = await this.$axios.get("/api/trial");
            this.pieChartData.datasets[0].data = data.chart
            this.familiesjoined = data.familiesjoined
            this.peoplesattached = data.peoplesattached
            this.loaded = true
            this.isLoading = false
            this.trial = trial
        }
    },
    created() {
        this.getCompanies()
    },
}
</script>
