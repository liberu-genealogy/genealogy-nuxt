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
								3 Mistakes Every Beginning Genealogist Should Try to Avoid Mistakes are part of the learning process, and no amount of advice can prevent you from ever making a single mistake. However, there are 3 things
								almost every amateur genealogist seems to do early on that you can easily avoid – failing to profile your ancestors, conflating 2 people with the same name, and assigning fathers to children they could not,
								logically, have fathered. Let’s look at each of these in turn.
								<br />
								Failing to Profile In this sense, profiling means learning what kind of person someone really is, regardless of appearances, but from a distance. In this case, it is a distance of time and medium – you are
								learning about them solely through records and text. Why profile? Simply put, people misrepresent themselves in official records. Maybe someone had several income streams, or several careers throughout their
								life. They almost certainly listed the most prestigious as their ‘profession’. When it comes to marriage and children issues, the motivations to ‘fudge’ the records now and then become even more obvious.
								Failing to catch any of these ‘fibs’ could lead your research in the wring direction. Make a profile, as detailed as you can, for each relative you investigate. Write it down and store it away.
								<br />
								Same name, different people This is incredibly common, and it is all too easy to miss. If two cousins of the same generation are given the same unusual family name, it can be incredibly easy to create one
								imaginary hybrid person out of them. After you make a mistake like that, nothing in the family tree fits quite right. We mention cousins specifically, because this can be the hardest pairing to sort out. If a
								grandfather and grandson have the same name, the dates will be way off. It isn’t impossible that the old guy took a new, young wife at the age of 85… but a new wife in a completely different village? And then
								had 5 kids? Dying at the ripe old age of 130? You can tell there is a problem. But if there happen to be a pair of Sarah Milligans, born in the same hospital, both to a mother named Mary, having children at
								roughly the same time… You can easily conflate them into a single woman with a complicated love life.
								<br />
								The Impossible Father We say ‘impossible father’ because, traditionally, there has been very little possibility of mistaking maternity – except in the cases where records have been deliberately mis-stated, as
								above. Simply put, do the math every time you assign a child to a pair of parents. If the putative father was a 6 year old boy or had been dead more than 9 months at the time of the birth, you got something
								wrong. The parents also have to have, conceivably (pun intended), been in the same place at the same time at least briefly. That said, some people and families have had a very lax attitude to recording exact
								birth dates. If you notice an ‘impossible father’ date, do not throw the possible relationship out. Put on your investigating hat, and get to the bottom of the mystery.
								<br />
								There. Now you can avoid these three mistakes. You’ll make other, more sophisticated mistakes instead!
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
