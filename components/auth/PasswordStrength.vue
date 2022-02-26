<template>
    <transition enter-active-class="zoomIn"
        leave-active-class="zoomOut">
        <svg v-if="password"
            class="animated"
            width="100%"
            height="5"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <rect v-for="i in 5"
                :key="i"
                width="15%"
                height="4"
                stroke-width="4"
                :x="x(i)"
                :stroke="i <= score() + 1 ? 'green' : 'orangered'"/>
        </svg>
    </transition>
</template>

<script>
import zxcvbn from 'zxcvbn';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'PasswordStrength',

    props: {
        password: {
            type: String,
            default: null,
        },
    },
    setup() {
        function score() {
            return this.password
                ? zxcvbn(this.password).score
                : 6;
        }
        function x(i) {
            const x = 2.5 + (i-1) * 15 + (i-1) * 5;
            return `${x}%`;
        }
    }
};
</script>
