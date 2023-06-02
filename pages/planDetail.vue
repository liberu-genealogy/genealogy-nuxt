<template>
  <div class="checkout">
    <div v-if="state === 'success'">Confirmed Successfully</div>
    <div v-else class="subscription">
      <div class="subscription-item" v-for="(plan, index) of plans" :class="{ 'selected': plan.id === lineItems[0].price }">
        <div class="subscription-nickname">{{ plan.nickname }}</div>
        <div class="subscription-title">{{ plan.title }}</div>
        <div class="subscription-amount">£{{ Number(plan.amount / 100).toFixed(2)}}</div>
      </div>
    </div> 
    <stripe-checkout
        ref="checkoutRef"
        :pk="pk"
        :mode="mode"
        :line-items="lineItems"
        :success-url="successUrl"
        :cancel-url="cancelUrl"
        @loading="v => loading = v"
    />
    <button @click="checkout" class="submit">Submit</button>
  </div>
</template>

<script>
export default {
  layout: 'default',
  head: {
    title: 'Stripe'
  },
  meta: {
    guestGuard: true,
    breadcrumb: 'stripe',
    // permission: { name: 'subscription menu' },
    title: 'Stripe',
  },

  data () {
    this.pk = process.env.STRIPE_PK;
    const urlParams = new URLSearchParams(window.location.search);

    const price = urlParams.get("price");
    const state = urlParams.get("state");
    const user_id = urlParams.get("id");

    if(state === 'success') this.confirmCheckout(price, user_id)

    return {
      mode: "subscription",
      loading: false,
      lineItems: [
        {
          price,
          quantity: 1,
        },
      ],
      successUrl: process.env.HOSTNAME + '/planDetail?' + urlParams + '&state=success',
      cancelUrl: process.env.HOSTNAME + '/planDetail?' + urlParams + '&state=cancel',
      state: state,
      plans: []
    };
  },
  methods: {
    checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    },
    async getplans() {
      const response = await this.$axios.$get('/api/get-subscription-plan')
      this.plans = response.map((plan) => {
        // console.log('this.loggedInUser.id',this.start_id+' ==' +company.id);
        if (plan.nickname == 'free') {
          this.selected_plan = plan
        }
        return plan;
      })
    },
    async confirmCheckout(price, id) {
      const response = await this.$axios.$post('/api/confirm_checkout', { price, id })
    },
  },
  created() {
    this.getplans();
  },
};
</script>
<router>
{
name: 'planDetail'
}
</router>
<style lang="scss" scoped>
  .checkout {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .subscription {
    width: 70%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
  }
  .subscription-item {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    border: 1px solid #4fcf8d;
    padding: 10px;
    text-align: center;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: #58bb88;
  }
  .subscription-item.selected {
    background-color: #4fcf8d;
    color: white;
  }
  .subscription-item .subscription-nickname {
    width: 100%;
    text-align: left;
    font-size: 14px;
  }
  .subscription-item .subscription-title {
    font-size: 18px;
    font-weight: 700;
  }
  .subscription-item .subscription-amount {
    color: #4fcf8d;
  }
  .subscription-item.selected .subscription-amount {
    color: white;
  }
  .submit {
    width: 200px;
    border-radius: 10px;
    background-color: #4fcf8d;
    color: white;
    padding: 10px 12px;
    margin: 10px;
  }
</style>
