<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      :pk="pk"
      :items="items"
      :successUrl="successUrl"
      :cancelUrl="cancelUrl"
    />
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
  layout: 'default',
  head: {
    title: 'Stripe'
  },
  meta: {
    breadcrumb: 'stripe',
    permission: { name: 'subscription menu' },
    title: 'Stripe',
  },

  data () {
    this.pk = process.env.STRIPE_PK;
    const urlParams = new URLSearchParams(window.location.search);

    return {
      items: [
        {
          price: urlParams.get("name"),

          quantity: 1,
        },
      ],
      successUrl: process.env.HOSTNAME,
      cancelUrl: process.env.HOSTNAME,
    };
  },
  methods: {
    checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>
<router>
{
    name: 'subscription.stripe.index'
}
</router>
