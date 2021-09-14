<template>
  <div>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column is-12">
        <h1 class="is-size-4 has-text-black">
          <span class="has-text-weight-medium">Payment</span>
        </h1>
      </div>
      <div class="column is-12">
        <nav class="breadcrumb mt-1 mb-0" aria-label="breadcrumbs">
          <ul>
            <li><a class="is-size-7 has-text-weight-medium has-text-link"
                   href="subscription.html">Subscription</a></li>
            <li class="is-size-7 has-text-weight-medium is-active"><a href="/dashboard"
                                                                      aria-current="page">Payment</a></li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="columns is-variable is-3">
      <div class="column is-9">
        <div class="card has-background-white has-text-black">
          <div class="card-content payment_block">
            <form @submit.prevent="submit()">
              <div class="field mb-5">
                <p class="control">
                  <input class="input is-large is-size-6" type="text" placeholder="Card Holder Name" :class="{ 'is-danger': $v.payment.card_holder_name.$error }" v-model="payment.card_holder_name">
                </p>
                <p class="help" :class="{ 'is-danger': $v.payment.card_holder_name.$error }" v-if="!$v.payment.card_holder_name.required">Field is required</p>

              </div>
              <div class="field mb-5">
                <p class="control">
                  <input class="input is-large is-size-6" type="text" placeholder="Card Number"  :class="{ 'is-danger': $v.payment.card_number.$error }" v-model="payment.card_number">
                </p>
                <p class="help" :class="{ 'is-danger': $v.payment.card_number.$error }" v-if="!$v.payment.card_number.required">Field is required</p>
              </div>
              <div class="columns is-gapless is-flex mb-5">
                <div class="column is-2 field mr-5">
                  <p class="control">
                    <input class="input is-large is-size-6" type="text" placeholder="MM / YY"  :class="{ 'is-danger': $v.payment.month_year.$error }" v-model="payment.month_year">
                  </p>
                  <p class="help" :class="{ 'is-danger': $v.payment.month_year.$error }" v-if="!$v.payment.month_year.required">Field is required</p>
                </div>
                <div class="column is-2 field">
                  <p class="control">
                    <input class="input is-large is-size-6" type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==3) return false;" placeholder="CVV"  :class="{ 'is-danger': $v.payment.cvv.$error }" v-model="payment.cvv" maxlength="3">
                  </p>
                  <p class="help" :class="{ 'is-danger': $v.payment.cvv.$error }" v-if="!$v.payment.cvv.required">Field is required</p>
                  <p class="help" :class="{ 'is-danger': $v.payment.cvv.$error }" v-if="!$v.payment.cvv.minLength">Name must have at least {{$v.payment.cvv.$params.minLength.min}} letters.</p>
                </div>
              </div>
              <button href="#" class="button is-block is-uppercase has-text-white has-background-primary has-text-weight-medium is-fullwidth is-medium">Proceed to Pay</button>
              <ul class="bullet_list mt-5">
                <li>Payments are securely processed by Stripe. No card data is stored on our website, it is securely processed directly by Stripe.</li>
                <li>You can pay regardless of your country currency please check the current exchange rates for how much you will be charged.</li>
              </ul>
            </form>
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
                <p class="is-size-7">Family Tree 365 is a secure online website
                  which you can use to create your own family tree(s) with.</p>
              </div>
              <div class="has-text-black has-text-weight-medium is-flex plans_info mb-5">
                <i class="fas fa-check mr-2 mt-1"></i>
                <p class="is-size-7">It has a tree viewer and DNA support
                  more features are planned such as the inclusion of archive databases and
                  collections.</p>
              </div>
              <div class="has-text-black has-text-weight-medium is-flex plans_info">
                <i class="fas fa-check mr-2 mt-1"></i>
                <p class="is-size-7">Set up your first family tree free of charge.
                  We offer different pricing levels with optional subscriptions if you need to create extra trees.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)

export default {
  layout: 'auth',
  data() {
    return {
      error: false,
      message: "",
      payment: {
        card_holder_name: null,
        card_number: null,
        month_year: null,
        cvv: null,
        payment_method: 'pm_card_visa',
        plan_id: 'price_1JUYYOAGwU4VOfbzZ1Gmdm8P'
      }
    };
  },
  validations: {
    payment: {
      card_holder_name: {
        required,
      },
      card_number: {
        required,
      },
      month_year: {
        required,
      },
      cvv: {
        required,
        minLength:minLength(3)
      },
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("fail")
      } else {
        console.log(this.payment)
        this.$axios
            .$post("/api/stripe/subscribe", this.payment)

            .catch(error => {
              console.log(error)
            });
      }
    }
  }
}

</script>
<style scoped>
@import '~/assets/css/admin.css';
</style>
