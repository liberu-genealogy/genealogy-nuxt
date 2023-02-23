<template>
	<div>
		<section class="hero main-hero" id="home">
			<div class="hero-body is-flex ai--c">
				<div class="navbar is-fixed-top" :class="{ clearHeader: isClear, darkHeader: isDark }" role="navigation" aria-label="main navigation">
					<div class="navbar-brand">
						<a class="navbar-item" href="#">
							<img src="~assets/images/logo1.svg" />
						</a>
						<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>
					<div id="navbarBasicExample" class="navbar-menu">
						<nav class="navbar-end" style="margin-right: 0 !important">
							<a data-scroll class="navbar-item" href="/"> Home </a>
							<NuxtLink to="/dashboard" class="navbar-item" v-if="isAuth"> Dashboard </NuxtLink>
							<NuxtLink to="/login" class="navbar-item" v-if="!isAuth"> Sign in </NuxtLink>

							<a v-else @click.prevent="logoutAccount()" class="navbar-item"> Log Out</a>
							<div class="navbar-item" v-if="!isAuth">
								<div class="buttons">
									<NuxtLink to="/register" class="button theme-button has-background-secondary has-text-weight-medium has-text-white"> Create an account </NuxtLink>
								</div>
							</div>
						</nav>
					</div>
				</div>
				<div class="container has-text-centered">
					<div class="columns is-gapless mt-6 is-mobile">
						<div class="column is-12 is-flex jc--c">
							<div class="hero-content">
								The GEDCOM file format has started a revolution in digital genealogy, and you can be a part of it. Computerised genealogy is a relatively new thing. Before the 1990s, all genealogical research was done the
								old-fashioned way – interviews with surviving relatives, crawling through dusty stacks of birth and marriage records, and reading ancient newspaper articles on microfiche. When the first computerised
								genealogy solutions came around nearly 30 years ago, they changed everything. That is not to say that everything has already been digitised. Plenty of those dusty old records still sit, virtually untouched,
								in county records archives, newspaper morgues and libraries all over the world. Many of them have never been even partially digitised. But many have been scanned and uploaded, and can be accessed easily. In
								fact, many genealogists use a standard file format called GEDCOM (the GEnealogical Data COMmunication standard), which has become the industry standard for cross-platform genealogical communication over the
								years. The GEDCOM format allows historians, genealogists and record-keepers of all kinds to exchange information and whole family trees easily.
								<br />
								Why does this matter to you? There are two main reasons. All of this genealogical sharing means your family history research might be much, much easier. You see, most historians and genealogists aren’t
								selfish with their data. They have a passion for making history and especially family history open and discoverable, and most would love to share al of the research they have with you in hopes that it will
								help you discover your family tree and that you might have just a few scraps of new information on some of the names on their huge lists.
								<br />
								You could actually be helping advance history, statistical science and realms of research that haven’t been invented yet The sad truth is that the vast majority of the people who have ever lived have not had
								their names recorded or passed on to the present. Of course, this is the case for anyone who died before writing. However, the last thousand years or so saw birth, marriage and death information written down
								for most people in many parts of the world – and yet almost all of this information has been lost forever. Most of that information is lost, because unless it is lucky enough to find its way into a protected
								archive of some kind, it was held on to only as long as people felt a personal connection to the subjects of the data. When the entire village is starving in a bad year in the 1400s, preserving records of
								your great aunt’s father-in-law’s ancestors was not a high priority. That said, a few snippets of genealogical data have been handed down through families for centuries. And any of these records could add the
								‘missing link’ some researcher needs to make a conclusion or connection in their studies. Digitising and sharing your family tree could make a truly important contribution to science. However, it is a lot
								more likely to benefit you, but filling in branches of that family tree that you didn’t even know existed.
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<footer class="px-5 footer">
			<div class="container">
				<div class="footer-cta columns is-gapless mb-0 pb-6">
					<div class="column is-7">
						<h1 class="is-size-2 has-text-primary has-text-weight-bold mb-3">Start Your Free Tree Now!</h1>
						<div class="is-size-6 has-text-white has-text-weight-regular">
							Your first tree is 100% free! If you need more, we offer affordable upgrades via our simple subscription plans. Need help? We can assist you to get started and explain Family Tree 365 features. Any issues? You
							can always contact our support team.
						</div>
					</div>
					<div class="footer-action column is-5 is-flex ai--c jc--fe">
						<NuxtLink to="/register" v-if="!isAuth" class="button theme-button theme-button-xl has-background-primary has-text-weight-medium has-text-white"> Create Your Own Tree </NuxtLink>
					</div>
				</div>
				<div class="footer-seprator"></div>
				<div class="columns is-multiline is-variable is-6 py-6 mb-0">
					<div class="column is-4">
						<img src="~assets/images/footer-logo.svg" width="180px" class="mb-5" />
						<div class="is-size-7 has-text-light has-text-weight-regular" style="line-height: 1.4rem">
							Copyright &copy; Genealogy Websites Ltd.<br />Registered Address: Kemp House, 160 City Road, London, United Kingdom, EC1V 2NX <br />Company Number: 13641244
						</div>
						<p class="mt-2">
							<a href="https://www.facebook.com/familytree365" target="_blank" class="is-size-7 has-text-link is-flex"> <i class="fab fa-facebook mr-2" style="margin-top: 0.2rem"></i>Follow us on Facebook </a>
						</p>
					</div>
					<div class="column is-5">
						<h1 class="is-size-5 has-text-white has-text-weight-bold mb-5">Quick Links</h1>
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
						<h1 class="is-size-5 has-text-white has-text-weight-bold mb-5">Contact Details</h1>
						<div class="is-flex ml-1 mb-4">
							<i class="fas fa-envelope mr-2 has-text-primary"></i>
							<a href="mailto:support@familytree365.com" class="is-size-7 has-text-link"> support@familytree365.com</a>
						</div>
						<div class="is-flex mb-4">
							<!-- <img src="img/mobile.svg" alt="" class="ml-2 mr-2"> -->
							<i class="fas fa-mobile-alt ml-2 mr-2 has-text-primary"></i>
							<a href="tel:+44 20 8064 1187" class="is-size-7 has-text-link is-flex"> +44 20 8064 1187</a>
						</div>
						<div class="is-flex ml-1 mb-5">
							<i class="fab fa-whatsapp mr-2 has-text-primary"></i>
							<a href="https://api.whatsapp.com/send?phone=+44 20 8064 1187" class="is-size-7 has-text-link is-flex"> +44 20 8064 1187</a>
						</div>
					</div>
				</div>
				<div class="footer-seprator"></div>
				<div class="content has-text-centered pt-6">
					<div class="columns is-gapless">
						<div class="column has-text-centered is-flex-desktop-only">
							<p class="is-size-7 has-text-light has-text-weight-regular">Copyright &copy; {{ new Date().getFullYear() }} Genealogy Websites Ltd</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
	meta: {
		guestGuard: true,
		title: "Blog",
	},
	data() {
		return {
			isDark: false,
			isClear: true,
		};
	},
	computed: {
		...mapState("auth", ["isAuth"]),
	},
	created() {
		window.addEventListener("scroll", this.handleScroll);
	},
	methods: {
		...mapActions("auth", ["logout"]),
		async logoutAccount() {
			await this.logout();
			// setTimeout(() => {
			//     this.$router.push('/')
			// }, 500)
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
};
</script>
<router>
{
    name: 'core.calendar.index',
}
</router>
<style scoped>
@import "~/assets/css/base.css";
@media screen and (max-width: 1006px) {
	.navbar.is-fixed-top {
		display: inline !important;
	}
}
</style>
