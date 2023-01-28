<template>
  <div class="checkout">
    <div v-if="state === 'success'">Confirmed Successfully</div>
    <div v-else>
      <stripe-checkout
          ref="checkoutRef"
          :pk="pk"
          :mode="mode"
          :line-items="lineItems"
          :success-url="successUrl"
          :cancel-url="cancelUrl"
          @loading="v => loading = v"
      />
      <button @click="checkout">Submit</button>
    </div> 
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
    this.pk = 'pk_test_51MUkkuCpGS5RDYC5HQVOzsMRCFGpS3Mm10mT7LcLMpgyPQkT1e3gBYyPB2u62SIxHivnO8U5aJvH3U1CSGflJsQW00ZgveCZAx';
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
      state: state
    };
  },
  methods: {
    checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    },
    async confirmCheckout(price, id) {
      const response = await this.$axios.$post('/api/confirm_checkout/', { price, id })
    },
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
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>