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
								Who had the longest family tree ever? Now, strictly speaking, we all probably have the same size family tree, either going back to Adam and Eve, an ancestor in central Africa, or someone neither the
								theologians or scientists can guess about. But that’s not what we mean. We mean, who had the longest prepared family tree ever? How many generations were they able to go back? Well, according to some sources,
								an ancient Chinese philosopher and politician named 孔夫子 wins the honours. That’s pronounced ‘Kǒng Fūzǐ’ by the way, and means ‘Master Kong’. You probably know him as ‘Confucious’. A genealogy of his family
								goes back a staggering 86 generations, spanning some 2,500 years! Of course, Master Kong was very important in life, and had the motive, means and opportunity to have his own genealogy charted out in detail.
								However, even he (or his servants) couldn’t see 2000 years back in time. If they had somehow been able to, that would reach back to before even China had a written language. No one recorded ancestry that far
								back. But Master Kong continued to be a celebrated personality long after his death, with his writings remaining influential in philosophy and politics to this day. Having ‘the Confucius’ as an ancestor is
								almost as prestigious today as it was in 400 BCE… even though some 3 million people all over the world claim descent from the great man today. In fact, that claim to ancestral fame has never ceased to be
								important, and 2,500 years later, an organisation called the CGCC or Confucius Genealogy Compilation Committee exists to serve the needs of this 3 million-strong demographic. They have recently published the
								5th volume of the official ‘Confucius Genealogy’.
								<br />
								How big is a 2,500-year genealogy? Really big. It has 2 million plus verified, official names. The entire thing is an 80-volume set. A hard copy is probably fairly pricey. Earlier editions were slimmer, but
								still remarkably detailed. The first fully recognised, officially accepted Genealogy of old Master Kong was published some 1500 years after his time, in the year 1080. Over the next thousand years, 4 more
								editions were made. The 4th, in 1937, had only (only!) 600,000 names.
								<br />
								So what is new in the 5th edition? Well, a lot has changed since 1937, and not just in China. The 5th edition is the first to include Master Kong’s female descendants, those who are minority ethnicities
								(China has more of those than you think) and those living overseas. In all, this added more than 1,300,000 names to the list.
								<br />
								How reliable is it? Reasonably. There was zero DNA testing done, but its not like there was any problem with records. If you can prove you were related to someone who was already ‘known’ to be related to the
								great man (and paid around half a pound), you could be added to the list. As the entry fees alone come to a cool £1,000,000, and no mention of how many 80-volume sets they actually sold, the publishers don’t
								really have any motive to exclude families from the ‘Confucius Club’, do they?
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
