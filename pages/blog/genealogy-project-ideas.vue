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
								Have a bit of time on your hands? Here are some great ways to help fill out your family tree.
								<br />
								Genealogy is a great hobby, and one that can occupy you for years or decades. But it can all start to feel a bit ‘samey’ after a while. If you’ve gotten into a rut with your family tree explorations, consider
								any of the following as a way to ‘blow out the cobwebs’ and approach your genealogy from a different direction.
								<br />
								Do some work on that book of family history Names and dates are one thing, but anyone who has delved into their family’s past will also have heard some interesting stories. Write one or two of them down. Who
								knows – you might end up with something publishable. If not, it would still make a worthy ‘vanity press’ book you can give to relatives. Gifts based on a shared family history make incredibly meaningful and
								personal presents. In a world of gift certificates and mass produced plastic garbage, make something no one else could for someone who will really appreciate it.
								<br />
								Sort out (and label) all your family photos Maybe you’ve been putting this, or something like it, off for too long already. Organise your photos, mementos, or other bits of family history. And make sure to
								write a few things down about each of those photos or items. After all, you might know why Uncle Zeke was holding a broken model airplane in that photo, but will your grandchildren, if you aren’t around to
								ask? Do your bit for future family historians.
								<br />
								Make time to see some old or distant relatives, and write down their family stories. Just imagine how many family stories have already been lost to time. Get out here and record a few. Encourage them to spill
								the beans about the really juicy stories. Heck, make sure to ask about the scandals. Those make the most interesting reading generations down the road, when no one is left to be embarrassed.
								<br />
								Is anyone else in your family or friend group working on a genealogy? Help them with theirs. If your family history is beginning to feel a little stale, why not lend your expertise (and resources) to someone
								else’s work? Seeing someone else’s enthusiasm for the subject many be all the boost you need. Also, you never know when you might need a hand too.
								<br />
								Pick up a new genealogy book Genealogy and family tree research has become very popular in the last few years. There are new books being written all the time, and some of them have very innovative ideas. At
								the worst, you could learn something new. At the best, you could find a renewed interest in one of your pet passions. No one ever regretted reading a good book.
								<br />
								See if there are any genealogy conferences or seminars in your area coming up These can be great opportunities to learn new techniques and see some of the products and services on the market for both amateur
								and professional genealogists. Many even give away free samples or trials.
								<br />
								Take a mini vacation organised around genealogy Is there a place associated with your family, or a set of isolated records you’ve always wanted to see? Take a few days, and make a vacation out of it. At the
								very least, a change of scenery does most people good!
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
