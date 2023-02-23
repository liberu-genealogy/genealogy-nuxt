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
								Why you deserve the best possible data security at Family Tree 365
								<br />
								To be clear, we at Family Tree 365 put your privacy and the security of your data first. We go far beyond the minimums required, and even exceed the industry’s ‘best practices’ in many ways. All of your data
								is as safe with us as it could be anywhere.
								<br />
								But why is security so important on a family tree site? It’s not like a hacker is going to discover the secrets of your everyday life. They aren’t going to stumble upon your work passwords here, or the
								numbers of your bank account. Why would anyone hack a family tree site at all?
								<br />
								Well, let’s consider a case of another website in the industry, who will remain nameless here. Though you could probably figure out who it was if you looked.
								<br />
								Just over 2 years ago, a website with nearly 1½ million people’s genetic information on it was breached – but in an unusual way. In this case it was less about stealing the company’s data or even the credit
								card numbers of their users, but about getting the actual DNA data of the users. The breach itself was actually detected quickly, and the vulnerability the hackers used was patched – but all of the DNA data
								was ‘out there’ in ‘the wrong hands’. Now, what could cyber criminals do with DNA data? This isn’t a sci-fi spy movie. They weren’t about to fake some important user’s DNA to gain entry into their secret lair
								or steal their tricked-out helicopter. Instead, the hackers (or someone who bought the data from them – who can say – posted thousands of fake profiles on the original website, once it was up and running.
								These profiles displayed false DNA results that suggested they were long lost relatives of existing users – exactly what many users hoped to find. Well, the worst part is we can’t be sure what was done with
								what they learned from the process. They could have pretended to be relatives, and scammed people out of money and support, but no one has reported anyone trying, and all the fake profiles were spotted. It
								could have been something as sinister as an insurance company, posting DNA results known to have a vulnerability to a disease like Alzheimer’s, and seeing how many people matched – they could then drop any
								customers they then felt might be a bad risk for an expensive illness. It could even have been law enforcement, using the hack to search for DNA that matches that from a crime scene, even against website
								users who chose not to allow law enforcement to access their results – something they have every right to refuse. In the end, the digital world has dangers we can’t even imagine. Our data can be used for
								nefarious purposes we might not ever actually now about. That is why Family Tree 365 uses literally top of the line security procedures with all of the sensitive data we hold, and why we don’t hold on to any
								user data longer than we need to in order to serve the purposes of our customers. You deserve the best, an we deliver it.
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
