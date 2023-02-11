import getSiteMeta from "./utils/getSiteMeta";
const meta = getSiteMeta();

export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: "en-GB",
			},
			title: "Family Tree 365 - Start your family tree today - free! Your first tree is 100% free. Sign-up to begin your genealogy journey today!",
			meta: [
				...meta,
				{ charset: "utf-8" },
				{ name: "HandheldFriendly", content: "True" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ property: "og:site_name", content: "Family Tree 365" },
				{
					hid: "de`script`ion",
					name: "description",
					content: "Our user-friendly yet powerful platform lets you create your own family tree the quick and easy way. No technical knowledge is required. Start your family tree today - free!",
				},
				{ property: "og:image:width", content: "2500" },
				{ property: "og:image:height", content: "780" },
				{ name: "twitter:site", content: "@familytree365" },
				{ name: "twitter:card", content: "summary_large_image" },
			],
			link: [
				{ rel: "icon", href: "/favicon.ico" },
				{
					hid: "canonical",
					rel: "canonical",
					href: process.env.BASE_URL,
				},
			],
		},
	},
	css: [
		"~/assets/css/bulma.css",
		"~/assets/css/base.css",
	]
   
});
