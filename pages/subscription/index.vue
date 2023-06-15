<template>
  <div>
    <NuxtLink
      class="is-size-7 has-text-weight-medium has-text-link"
      to="/subscription/paypal"
      >PayPal</NuxtLink
    >
    <loading
      :active.sync="isLoading"
      :color="color"
      :background-color="backgroundColor"
    >
    </loading>
    <div class="currency-div">
      <span>Currency: </span>
      <div class="currency-inside-div">
        <vue-select
          :options="currency_options"
          :placeholder="selected_currency"
          @input="selectCurrency"
          :clearable="false"
        />
      </div>
    </div>
    <div class="column is-12">
      <h1 class="is-size-4 has-text-black">
        <span class="has-text-weight-medium">Subscription</span>
      </h1>
    </div>
    <div class="column is-12">
      <nav class="breadcrumb mt-1 mb-0" aria-label="breadcrumbs">
        <ul>
          <li>
            <NuxtLink
              class="is-size-7 has-text-weight-medium has-text-link"
              to="dashboard"
              >Home</NuxtLink
            >
          </li>
          <li class="is-size-7 has-text-weight-medium is-active">
            <a href="" aria-current="page">Subscription</a>
          </li>
          <li class="is-size-7 has-text-weight-medium is-active">
            <a href="" aria-current="page">Stripe</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="columns is-variable is-3 is-desktop">
      <div class="column is-9">

		<section class="section">
            <div>
                <strong>Payment interval:</strong>
            </div>

            <button v-for="interval in intervals" class="button is-primary mr-2 mb-4 capitalize" @click="selectInterval(interval)">
                {{interval}}
            </button>

			<div class="container">
				<div class="columns">
					<div class="column has-text-centered " v-for="plan in plans" :class="{best_selling: plan.metadata.featured, 'has-background-white': !plan.metadata.featured}" v-if="plan.interval == selectedInterval">
                        <h2 class="title is-3 plan_title has-text-weight-bold" :class="{'has-text-white ': plan.metadata.featured}" :title="plan.id">{{ plan.title }}</h2>
						<p class="has-text-weight-light plan_subtitle"></p>

						<div v-if="plan.subscribed && plan.discount_amount">
							<div class="price">
								<h2 class="title is-2 has-text-weight-bold">


                                    {{
                                      selected_currency_symbol +
                                      ((plan.final_price * selected_currency_rate) / 100).toFixed(2)
                                    }}

								<span class="has-text-weight-light">/{{ plan.interval }}</span></h2>
							</div>
                            <p class="has-text-white">
                                Original price: 
                                <strike>
                                {{
                                  selected_currency_symbol +
                                  ((plan.amount * selected_currency_rate) / 100).toFixed(2)
                                }}
                                </strike>
                            </p>

						</div>
						<div v-else>
                            <div class="price">
                                <h2 class="title is-2 has-text-weight-bold">

                                    {{
                                      selected_currency_symbol +
                                      ((plan.amount * selected_currency_rate) / 100).toFixed(2)
                                    }}

                                <span class="has-text-weight-light">/{{ plan.interval }}</span></h2>
                            </div>
                        </div>
			
						<div class="features" :class="{'has-text-white': plan.metadata.featured}">
							<p v-for="feature in plan.features">{{ feature }}</p>
							<p class="unavailable" v-for="feature in plan.features_missing">{{ feature }}</p>
						</div>
						<div class="spacer"></div>

						<NuxtLink
						  v-if="has_payment_method == false"
						  :to="'/subscription/stripe?name=' + plan.id"
						  class="button is-primary"
						  :class="{'best_selling_btn': plan.metadata.featured}"
						  >Subscribe by card</NuxtLink
						>

						<div v-if="has_payment_method && plan.subscribed === false">
						  <button
							@click="open(plan.id)"
							:class="{ 'is-success': plan.subscribed, 'best_selling_btn': plan.metadata.featured}"
						  	class="button is-primary"
						  >
							Subscribe
						  </button>
						</div>

						<div v-if="plan.subscribed">
						  <button
							@click="open(null)"
							class="button is-danger "
							:class="{ 'is-success': plan.subscribed }"
						  >
							Unsubscribe
						  </button>
						</div>

                        <p v-if="plan.trial_end" class='mt-2'>
                        Trial end date: <strong>{{ plan.trial_end }}</strong>
                        </p>

					</div>
				</div>
			</div>
		</section>
      </div>
      <div class="column is-3">
        <div class="columns is-gapless is-multiline">
          <div
            class="card plan_info_block has-background-primary has-text-black"
          >
            <img src="~assets/images/plan_info_img.svg" alt="" />
            <div class="card-content">
              <div
                class="has-text-black has-text-weight-medium is-flex plans_info mb-5"
              >
                <i class="fas fa-check mr-2 mt-1"></i>
                <p class="is-size-7">
                  Family Tree 365 is a secure online website which you can use
                  to create your own family tree(s) with.
                </p>
              </div>
              <div
                class="has-text-black has-text-weight-medium is-flex plans_info mb-5"
              >
                <i class="fas fa-check mr-2 mt-1"></i>
                <p class="is-size-7">
                  It has many charts, text reports, public member tree searching
		  and DNA matching support with more features planned
                  such as the inclusion of more archive databases & collections
                </p>
              </div>
              <div
                class="has-text-black has-text-weight-medium is-flex plans_info"
              >
                <i class="fas fa-check mr-2 mt-1"></i>
                <p class="is-size-7">
                  It is aimed to be affordable with a 14 day no obligation trial
                  with different pricing levels depending on how many trees and DNA kits you
                  require.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirmation</p>
          <button class="delete" aria-label="close" @click="close()"></button>
        </header>
        <section class="modal-card-body">Are you sure?</section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="subscribe()"
            v-if="selectedPlanId != null"
          >
            Subscribe
          </button>
          <button class="button is-success" @click="unsubscribe()" v-else>
            Unsubscribe
          </button>
          <button class="button" @click="close()">No</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<router>
{
    name: 'subscription.index'
}
</router>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'default',
  head: {
    title: 'Subscription'
  },
  meta: {
    breadcrumb: 'subscription',
    title: 'Subscription'
  },
  components: {
    Loading
  },
  data() {
    return {
      error: false,
      message: '',
      isLoading: false,
      fullPage: true,
      color: '#4fcf8d',
      backgroundColor: '#ffffff',
      response: null,
      has_payment_method: false,
      plans: [],
      selectedPlanId: null,
      currency_options: ['USD', 'GBP', 'EUR', 'AUD'],
      selected_currency: 'GBP',
      selected_currency_symbol: '£',
      selected_currency_rate: 1,
      isActive: false,
      intervals: [],
      selectedInterval: null,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    selectInterval(interval) {
        this.selectedInterval = interval;
    },
    handleSelectedFiles(event) {
      this.file = this.$refs.fileInput.files[0]
      this.fileName = this.file.name
    },
    submit() {},
    async loadPlans() {
      const response = await this.$axios.$get('/api/stripe/plans')

      this.getCurrentSubscription()
      this.plans = response

      this.intervals = [... new Set(this.plans.map( plan => plan.interval))];
      this.selectedInterval = this.intervals.length > 0 ? this.intervals[0] : null;

      this.isLoading = false
    },
    async getCurrentSubscription() {
      const response = await this.$axios.$get(
        '/api/stripe/current-subscription'
      )

      this.isLoading = false
      this.has_payment_method = response.has_payment_method
      if (response.subscribed) {

        this.plans.find(plan => {
          if (plan.id == response.plan_id) {
            plan.subscribed = true
            plan.final_price = response.final_price;
            plan.discount_amount = response.discount_amount;
            plan.trial_end = response.trial_end;
            this.selectedInterval = plan.interval;

          } else {
            plan.subscribed = false
          }
        })
      } else {
          this.plans.map(plan => {
              plan.subscribed = false
          })
      }
      this.isLoading = false
    },
    subscribe() {
      this.isLoading = false
      this.isActive = false
      this.$axios.$post('/api/stripe/subscribe', {
        plan_id: this.selectedPlanId
      }).then(() => {
          this.getCurrentSubscription()
          this.isLoading = false
      })
    },
    unsubscribe() {
      this.isLoading = false
      this.isActive = false
      this.$axios.post('/api/stripe/unsubscribe', {})
          .then(() => {
              this.getCurrentSubscription()
              this.isLoading = false
          })
    },
    async selectCurrency(currency) {
      await fetch(
        'https://api.freecurrencyapi.com/v1/latest?apikey=9WkmXwTgkCNODiQbpgzXrgt1SZkSBsIA1B3xZyMe'
      )
        .then(response => response.json())
        .then(({ data }) => {
          console.log('new cur', data)
          switch (currency) {
            case 'GBP':
              this.selected_currency_symbol = '£'
              this.selected_currency_rate = 1
              break
            case 'USD':
              this.selected_currency_symbol = '$'
              this.selected_currency_rate = 1 / data.GBP
              break
            case 'EUR':
              this.selected_currency_symbol = '€'
              this.selected_currency_rate = data.EUR / data.GBP
              break
            case 'AUD':
              this.selected_currency_symbol = '$'
              this.selected_currency_rate = data.AUD / data.GBP
              break
            default:
              this.selected_currency_symbol = '£'
              this.selected_currency_rate = 1
              break
          }
        })
        .catch(() => {})
    },
    open(planId) {
      this.isActive = true
      this.selectedPlanId = planId
    },
    close() {
      this.isActive = false
    }
  },
  created() {
    this.loadPlans()
  }
}
</script>
<style>

        .capitalize {
            text-transform: capitalize;
        }
		.is-one-third{
			padding: 4rem 5rem;
		}
		.spacer{
			height: 40px;
		}
		.plan_title{
			margin-bottom: 0 !important;
		}
		.plan_subtitle{
			color: #90A4AE;
		}
		.price{
			margin-top: 40px;
		}
		.price h2{
			color: #00C4A7;
		}
		.price span{
			font-size: 20px; 
		}
		.unavailable{
			text-decoration:line-through;
			color: #90A4AE;
		}
		.best_selling{
			background: #003049;
		}
		.best_selling h2{
			color: #F77F00;
		}
		.best_selling_btn{
			background: #f77f00 !important;
		}
</style>
