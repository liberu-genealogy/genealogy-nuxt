<template>
	<base-app-footer>
		<template v-slot:default="{ meta }">
			<footer class="footer">
				<div class="content has-text-centered">
					<div class="level">
						<div class="level-item">
							<strong class="mr-1">
								{{ meta.appName }} v{{ meta.version }}
								<span class="has-margin-left-small"></span>
								<a href="https://github.com/laravel-enso/enso" target="_blank">
									<img 	src="/images/enso.svg"
											alt="Made with Laravel Enso"
											width="28"
											height="28"/>
								</a>
								<a href="https://vuejs.org" target="_blank">
									<img src="/images/vue-badge.png"/>
								</a>
								<br/>
								<br/>
								<span class="icon"><fa :icon="['fab', 'github']"/></span>
								<a href="https://github.com/modularsoftware/genealogy" target="_blank">
									Genealogia GitHub
								</a>
								<span class="icon"><fa :icon="['fab', 'facebook']"/></span>
								<a href="https://www.facebook.com/genealogiawebsite" target="_blank">
									Genealogia Facebook Page
								</a>
							</strong>
						</div>
					</div>
				</div>
			</footer>
		</template>
	</base-app-footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import BaseAppFooter from '../../core/components/AppFooter.vue';

library.add(faHeart,faGithub,faFacebook);
export default {
	name: 'AppFooter',

	inject: ['i18n'],

	components: { BaseAppFooter },
};
</script>

<style lang="scss">
	@import '~/assets/themes/variables';

	.footer {
		background: inherit;
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
