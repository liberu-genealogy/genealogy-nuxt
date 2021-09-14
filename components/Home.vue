<template>
    <div>
     <section class="hero main-hero" id="home">
        <div class="hero-body is-flex ai--c">
            <div class="navbar is-fixed-top " :class="{ 'clearHeader': isClear, 'darkHeader': isDark }" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="#">
                        <img src="~assets/images/logo1.svg">
                    </a>
                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                        data-target="navbarBasicExample" >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" class="navbar-menu">
                    <nav class="navbar-end" style="margin-right: 0 !important;">
                        <a data-scroll class="navbar-item" href="#home">
                            Home
                        </a>
                        <a data-scroll class="navbar-item" href="#features">
                            Features
                        </a>
                        <a data-scroll class="navbar-item" href="#why">
                            Why Family Tree 365
                        </a>
                        <a data-scroll class="navbar-item" href="#overview">
                            Overview
                        </a>
                        <NuxtLink to="/dashboard" class="navbar-item" v-if="isAuth">
                          Dashboard
                        </NuxtLink>
                        <NuxtLink to="/login" class="navbar-item" v-if="!isAuth">
                          Sign in
                        </NuxtLink>

                        <a v-else @click.prevent="logoutAccount()" class="navbar-item">
                                Log Out</a>
                        <div class="navbar-item" v-if="!isAuth">
                            <div class="buttons">
                                <NuxtLink to="/register"
                                    class="button theme-button has-background-secondary has-text-weight-medium has-text-white">
                                    Create an account
                                </NuxtLink>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="container has-text-centered">
                <div class="columns is-gapless mt-6 is-mobile">
                    <div class="column is-12 is-flex jc--c">
                        <div class="hero-content">
                            <h1 class="is-size-2 has-text-white has-text-weight-bold">
                              Family Tree 365 is an online family tree maker that’s feature-rich yet easy to use.
                            </h1>
                            <h2 class="is-size-5 has-text-light mt-6">
                              It is designed to have extensive functionality while being simple to use, secure, and accessible.
                              You can easily import and export GEDCOM files, view and manipulate data, and unlock extra features. Sign-up to start your free family tree today!
                            </h2>
                            <NuxtLink to="/register"
                                class="button theme-button theme-button-xl has-background-secondary has-text-weight-medium has-text-white mt-6" v-if="!isAuth">
                                Create Your Own Tree
                            </NuxtLink>
                            <div class="is-size-6 has-text-light mt-5" v-if="!isAuth"> <NuxtLink class="has-text-light" to="/login"> Already have an account? Sign in </NuxtLink></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="features px-5 my-6" id="features">
        <div class="container">
            <h1 class="is-size-2 has-text-black has-text-weight-bold mb-6">
                Our Product Features
            </h1>
            <div class="columns is-variable is-8 is-multiline">
                <div class="column is-4 mb-5">
                    <img src="~assets/images/secured.svg" alt="" class="mb-4">
                    <div class="is-size-4 has-text-black has-text-weight-bold"> Easy to use &amp; secure.</div>
                    <div class="is-size-6 has-text-black has-text-weight-regular mt-2">With an intuitive interface, you can get up and running quickly.
                      There’s no steep learning curve. In-built security features keep your family tree private and secure.</div>
                </div>
                <div class="column is-4 mb-5">
                    <img src="~assets/images/import.svg" alt="" class="mb-4">
                    <div class="is-size-4 has-text-black has-text-weight-bold"> Easily Import &amp; Export</div>
                    <div class="is-size-6 has-text-black has-text-weight-regular mt-2">Our user-friendly import/export tool makes uploading and downloading
                      existing family trees a breeze. Compatible with GEDCOM (family tree standard data format). </div>
                </div>
                <div class="column is-4 mb-5">
                    <img src="~assets/images/record.svg" alt="" class="mb-4">
                    <div class="is-size-4 has-text-black has-text-weight-bold"> Record your Family </div>
                    <div class="is-size-6 has-text-black has-text-weight-regular mt-2">Create your family tree(s) and view in different formats using our tree viewer.
                      Even if you’re new to genealogy, you can quickly get to grips with our platform. </div>
                </div>
                <div class="column is-4 mb-5">
                    <img src="~assets/images/ntree.svg" alt="" class="mb-4">
                    <div class="is-size-4 has-text-black has-text-weight-bold"> No limit for Family Tree </div>
                    <div class="is-size-6 has-text-black has-text-weight-regular mt-2">We impose no limits on the size of your family tree so you are free to expand as you wish.
                      The platform can easily support hundreds of thousands of records.</div>
                </div>
                <div class="column is-4 mb-5">
                    <img src="~assets/images/upload.svg" alt="" class="mb-4">
                    <div class="is-size-4 has-text-black has-text-weight-bold"> Upload your Files </div>
                    <div class="is-size-6 has-text-black has-text-weight-regular mt-2">Upload a range of media formats to support your family tree,
                      including source documents, photographs, and other files related to your genealogy search. </div>
                </div>
                <div class="column is-4 mb-5">
                    <img src="~assets/images/gimport.svg" alt="" class="mb-4">
                    <div class="is-size-4 has-text-black has-text-weight-bold"> GEDCOM Import </div>
                    <div class="is-size-6 has-text-black has-text-weight-regular mt-2">We support GEDCOM, the de facto standard file format for genealogy data.
                      You can import and export GEDCOM family tree data at the click of a button. </div>
                </div>
            </div>
        </div>
    </section>

    <section class="why my-6" id="why">
        <div class="container is-fluid my-6 px-0">
            <div class="columns my-6 is-gapless is-multiline">
                <div class="column is-5">
                    <img src="~assets/images/sd.svg" class="flot-block" alt="">
                </div>
                <div class="column is-7 is-flex jc--c ai--c">
                    <div class="px-5 is-flex fd--c jc--c py-6">
                        <h1 class="is-size-3 has-text-black has-text-weight-bold mb-5">
                            Why Choose Family Tree 365?
                        </h1>
                        <div class="is-size-6 has-text-black has-text-weight-regular is-flex ai--fs mb-4">
                            <img src="~assets/images/Checkmark.svg" alt="" class="bullet mt-2 mr-3">
                          Family Tree 365 is the simple and secure way to create your own family tree online.
                          It is designed to be easy to understand with great functionality..</div>
                        <div class="is-size-6 has-text-black has-text-weight-regular is-flex ai--fs mb-4">
                            <img src="~assets/images/Checkmark.svg" alt="" class="bullet mt-2 mr-3">
                          It has an intuitive yet powerful tree viewer and DNA matching. More features are also planned,
                          as the inclusion of archive databases and collections.</div>
                        <div class="is-size-6 has-text-black has-text-weight-regular is-flex ai--fs">
                            <img src="~assets/images/Checkmark.svg" alt="" class="bullet mt-2 mr-3">
                      Set up your first family tree free of charge. We offer different pricing levels with optional subscriptions
                      if you need to create extra trees</div>
                        <NuxtLink to="/register" v-if="!isAuth"
                            class="button theme-button theme-button-xl has-background-primary has-text-weight-medium has-text-white mt-5">
                            Create Your Own Tree
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="about mt-6 px-5" id="overview">
        <div class="container">
            <div class="columns is-mobile is-gapless is-multiline is-centered">
                <div class="column is-full-mobile is-8-desktop has-text-centered">
                    <h1 class="is-size-2 has-text-black has-text-weight-bold">
                        Create &amp; manage your family tree
                    </h1>
                    <div class="is-size-6 has-text-black has-text-weight-regular mt-2">Family Tree 365 lets you create and manage your family tree the quick and easy way.
                      Register to access our user-friendly platform that gives you all the tools you need to create, manage, and research your family genealogy.</div>
                </div>
                <div class="column is-12 has-text-centered">
                    <div class="fadein">
                        <img src="~assets/images/mockup01@2x.webp" alt="">
                        <img src="~assets/images/mockup02@2x.webp" alt="">
                        <img src="~assets/images/mockup03@2x.webp" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="px-5 footer">
        <div class="container">
            <div class="footer-cta columns is-gapless mb-0 pb-6">
                <div class="column is-7">
                    <h1 class="is-size-2 has-text-primary has-text-weight-bold mb-3">
                        Start Your Free Tree Now!
                    </h1>
                    <div class="is-size-6 has-text-white has-text-weight-regular">
                      Your first tree is 100% free! If you need more, we offer affordable upgrades via our simple subscription plans.
                      Need help? We can assist you to get started and explain Family Tree 365 features. Any issues? You can always contact our support team.
                    </div>
                </div>
                <div class="footer-action column is-5 is-flex ai--c jc--fe">
                    <NuxtLink to="/register" v-if="!isAuth"
                        class="button theme-button theme-button-xl has-background-primary has-text-weight-medium has-text-white">
                        Create Your Own Tree
                    </NuxtLink>
                </div>
            </div>
            <div class="footer-seprator"></div>
            <div class="columns is-multiline is-variable is-6 py-6 mb-0">
                <div class="column is-4">
                    <img src="~assets/images/footer-logo.svg" width="180px" class="mb-5">
                    <div class="is-size-7 has-text-light has-text-weight-regular" style="line-height: 1.4rem;">
                        Copyright &copy; Family Tree 365 Ltd,<br> Unit A, 82 James Carter Road, Mildenhall, Suffolk, England, IP28 7DE<br> Company
                        number 12734769
                    </div>
                    <p class="mt-2">
                        <a href="https://www.facebook.com/familytree365" target="_blank" class="is-size-7 has-text-link is-flex">
                            <i class="fab fa-facebook mr-2" style="margin-top: 0.2rem;"></i>Follow us on Facebook </a>
                        </p>
                </div>
                <div class="column is-5">
                    <h1 class="is-size-5 has-text-white has-text-weight-bold mb-5">
                        Quick Links
                    </h1>
                    <div class="columns is-gapless is-multiline is-flex fd--r">
                        <div class="column is-flex fd--c">
                            <NuxtLink to="/" class="is-size-7 has-text-link mb-2">Home</NuxtLink>
                            <a href="#features" class="is-size-7 has-text-link mb-2">Features</a>
                            <a href="#why" class="is-size-7 has-text-link mb-2">Why Family Tree 365?</a>
                            <a href="#" class="is-size-7 has-text-link mb-2">About</a>
                        </div>
                        <div class="column is-flex fd--c">
                            <NuxtLink to="/login" class="is-size-7 has-text-link mb-2">Sign in</NuxtLink>
                            <NuxtLink to="/privacy" class="is-size-7 has-text-link mb-2">Privacy Policy</NuxtLink>
                            <NuxtLink to="/termsandconditions" class="is-size-7 has-text-link mb-2">Terms &amp; Conditions</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="column is-3">
                    <h1 class="is-size-5 has-text-white has-text-weight-bold mb-5">
                        Contact Details
                    </h1>
                    <div class="is-flex ml-1 mb-4">
                        <i class="fas fa-envelope mr-2 has-text-primary"></i>
                        <a href="mailto:support@familytree365.com" class="is-size-7 has-text-link">
                            support@familytree365.com</a>
                    </div>
                    <div class="is-flex mb-4">
                        <!-- <img src="img/mobile.svg" alt="" class="ml-2 mr-2"> -->
                        <i class="fas fa-mobile-alt ml-2 mr-2 has-text-primary"></i>
                        <a href="tel:+44 20 8064 1187" class="is-size-7 has-text-link is-flex">
                          +44 20 8064 1187</a>
                    </div>
                    <div class="is-flex ml-1 mb-5">
                        <i class="fab fa-whatsapp mr-2 has-text-primary"></i>
                        <a href="https://api.whatsapp.com/send?phone=+44 20 8064 1187"
                            class="is-size-7 has-text-link is-flex">
                            +44 20 8064 1187</a>
                    </div>
                </div>
            </div>
            <div class="footer-seprator"></div>
            <div class="content has-text-centered pt-6">
                <div class="columns is-gapless">
                    <div class="column has-text-centered is-flex-desktop-only">
                        <p class="is-size-7 has-text-light has-text-weight-regular">Copyright &copy; {{ new Date().getFullYear() }} Family Tree 365 Ltd</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'default.index',
    layout: 'default',
    meta: {
        guestGuard: true,
        title: 'Landing Page'
    },
    data() {
        return {
            isDark: false,
            isClear: true,
        };
    },
    computed: {
        ...mapState('auth', ['isAuth']),
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        ...mapActions('auth', ['logout']),
        async logoutAccount() {
            await this.logout();
            setTimeout(() => {
                this.$router.push('/login')
            }, 500)
        },

        handleScroll() {
            if (window.scrollY >= 10) {
                this.isClear = false;
                this.isDark = true;
            } else {
                this.isClear = true;
                this.isDark = false;
            }
        },
    },
}
</script>

<style scoped>
    @import '~/assets/css/base.css';
    @media screen and (max-width: 1006px) {
        .navbar.is-fixed-top  {
            display: inline !important;
        }
    }
</style>