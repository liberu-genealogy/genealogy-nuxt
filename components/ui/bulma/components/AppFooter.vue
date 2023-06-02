<template>
    <base-app-footer>
        <template v-slot:default="{ meta }">
            <footer class="footer" :class="{'isAuthenticated':loggedInUser}">
                <div class="content has-text-centered has-text-white">
                    <strong class="mr-1 has-text-white" >
                        Family Tree 365
                    </strong>
                   
                    <span class="has-text-basic" style="font-size: 14px; font-weight: 400;">
                         Copyright &copy; Family Tree 365 Ltd,<br>
			 Kemp House, 82 James Carter Road, Mildenhall, Suffolk, IP28 7DE<br>
			 Company number: 14652026
                    </span>
                   <p class="mt-2">
                        <a href="https://www.facebook.com/familytree365" target="_blank" class="is-size-7 has-text-link is-flex">
                            <i class="fab fa-facebook mr-2" style="margin-top: 0.2rem;"></i>Follow us on Facebook </a>
                        </p>

                </div>
            </footer>
        </template>
    </base-app-footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import BaseAppFooter from '../../core/components/AppFooter.vue';
import { mapGetters, mapActions } from "vuex";
library.add(faHeart, faGithub);

export default {
    name: 'AppFooter',

    inject: ['i18n'],

    components: { BaseAppFooter },

    computed: {
         ...mapGetters(['loggedInUser'])
    },
};
</script>

<style lang="scss">
    @import '~/assets/themes/variables';

    .footer {
        &.isAuthenticated {
            background: #2FAF6D !important;
            padding: 1rem 1.5rem 0.8rem !important;
        }
        [dir='ltr'] & {
            margin-left: 0;
            transition: margin-left .5s, width .5s;
        }
        [dir='rtl'] & {
            margin-right: $sidebar-width;
            transition: margin-right .5s, width .5s;
        }

        &.sidebar-collapsed {
            [dir='ltr'] & {
                margin-left: $sidebar-collapsed-width;
            }
            [dir='rtl'] & {
                margin-right: $sidebar-collapsed-width;
            }
        }

        figure.image.earthlink {
            width: 112px;
            margin-left: 1em;
            margin-right: 1em;
        }
    }

    @media screen and (max-width: 1023px) {
        .footer {
            [dir='ltr'] & {
                margin-left: 0px;
            }
            [dir='rtl'] & {
                margin-right: 0px;
            }
        }
    }

</style>
