<template>
  <div>
    <NuxtLink class="is-size-7 has-text-weight-medium has-text-link"
              to="/subscription">Stripe</NuxtLink>
<!--    <loading :active.sync="isLoading" :color="color" :background-color="backgroundColor"> </loading>-->
    <div class="currency-div">
      <span>Currency: </span>
      <div class="currency-inside-div">
        <v-select :options="currency_options" :placeholder="selected_currency"
                  @input="selectCurrency" :clearable="false"/>
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
          <li><NuxtLink class="is-size-7 has-text-weight-medium has-text-link"
                        to="dashboard">Home</NuxtLink></li>
          <li class="is-size-7 has-text-weight-medium is-active"><a href=""
                                                                    aria-current="page">Subscription</a></li>
          <li class="is-size-7 has-text-weight-medium is-active"><a href=""
                                                                    aria-current="page">Paypal</a></li>
        </ul>
      </nav>
    </div>
    <div class="columns is-variable is-3 is-desktop">
      <div class="column is-9">
        <div class="columns is-multiline is-variable is-3">
          <div class="column is-6" v-for="plan in plans" :key="plan.id">
            <div class="card has-background-white has-text-black">
              <div class="card-content">
                {{selected_currency_symbol + (plan.amount * selected_currency_rate).toFixed(2)
                }}
                <div class="is-size-6 has-text-black is-uppercase has-text-weight-bold">{{ plan.nickname }}</div>
                <div class="is-size-7 has-text-black has-text-weight-regular">{{ plan.title }}</div>
                <!-- <NuxtLink  v-if="has_payment_method == false" :to="'/subscription/payment/' + plan.id" class="button is-size-7 is-uppercase has-text-white has-background-primary has-text-weight-medium is-light mt-4">Subscribe</NuxtLink>
                <div v-if="has_payment_method && plan.subscribed === false">
                    <button @click="open(plan.id)"
                        class="button is-size-7 is-uppercase has-text-white has-background-primary has-text-weight-medium is-light mt-4">
                        Subscribe
                    </button>
                </div>
                <div v-if="plan.subscribed">
                    <button
                        @click="open(null)"
                        class="button is-size-7 is-uppercase is-danger has-text-weight-medium is-light mt-4" :class="{ 'is-success': plan.subscribed }">
                        Unsubscribe
                    </button>
                </div> -->
                <div v-if="plan.subscribed === false">
                  <button @click="handlePayment(plan)"
                          class="button is-size-7 is-uppercase has-text-white has-background-primary has-text-weight-medium is-light mt-4">
                    Subscribe
                  </button>
                </div>
                <div v-else>
                  <button @click="unsubscribePaypal(plan)"
                          class="button is-size-7 is-uppercase has-text-white has-background-danger has-text-weight-medium is-light mt-4">
                    Unsubscribe
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="columns is-gapless is-multiline">
          <div class="card plan_info_block has-background-primary has-text-black">
            <img src="~assets/images/plan_info_img.svg" alt="">
            <div class="card-content">
              <div class="has-text-black has-text-weight-medium is-flex plans_info mb-5">
                <i class="fas fa-check mr-2 mt-1"></i>
                <p class="is-size-7">Family Tree 365 is a secure online website which you can use to create your own family tree(s) with.</p>
              </div>
              <div class="has-text-black has-text-weight-medium is-flex plans_info mb-5">
                <i class="fas fa-check mr-2 mt-1"></i>
                <p class="is-size-7">It has a tree viewer and DNA support more features are planned such as the inclusion of archive databases & collections</p>
              </div>
              <div class="has-text-black has-text-weight-medium is-flex plans_info">
                <i class="fas fa-check mr-2 mt-1"></i>
                <p class="is-size-7">It is aimed to be affordable with a 7 day no obligation trial with different pricing levels depending on how many trees you require.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="modal" :class="{'is-active': isActive}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirmation</p>
          <button class="delete" aria-label="close" @click="close()"></button>
        </header>
        <section class="modal-card-body">
          Are you sure?
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="subscribe()" v-if="selectedPlanId != null">Yes</button>
          <button class="button is-success" @click="unsubscribe()" v-else>Yes</button>
          <button class="button" @click="close()">No</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  layout: 'auth',
  components: {
    // Loading
  },
  data() {
    return {
      isLoading: false,
      plans: []
    }
  },
  mounted() {
    this.loadPlans();
  },
  methods: {
    async loadPlans() {
      console.log('hh');
      const response = await this.$axios.post("http://localhost:8000/api/paypal/plans", {email: 'heru0502@gmail.com'});
      console.log("response", response);

      this.plans = response.data;
      this.isLoading = false;
    }
  }

}
</script>