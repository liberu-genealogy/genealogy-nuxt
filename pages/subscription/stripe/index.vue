<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      :pk="pk"
      :mode="mode"
      :lineItems="lineItems"
      :successUrl="successUrl"
      :cancelUrl="cancelUrl"
    />
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
import { ref, computed, useStore } from 'vue'
import { URLSearchParams } from 'url';
export default {
  layout: 'default',
  head: { title: 'Stripe' },
  meta: { breadcrumb: 'stripe', permission: { name: 'subscription menu'}, title: 'Stripe' },
  setup() {
    this.pk = process.env.STRIPE_PK;
    const urlParams = new URLSearchParams(window.location.search);
    const mode = ref('subscription')
    const lineItems = ref([
      { price: urlParams.get('name'), quantity: 1}, successUrl = ref(process.env.HOSTNAME), cancelUrl = ref(process.env.HOSTNAME)
    ])
    return { mode, lineItems }
    function checkout() {
      this.$refs.checkoutRef.redirectToCheckout();
    }
  }
}
</script>
<router>
{
    name: 'subscription.stripe.index'
}
</router>
