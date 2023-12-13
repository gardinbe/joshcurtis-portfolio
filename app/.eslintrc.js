/* eslint-disable quote-props */

module.exports = {
	"extends": [
		"../.eslintrc",
		"plugin:vue/base",
		"plugin:vue/vue3-recommended"
	],
	"plugins": [
		"eslint-plugin-vue"
	],
	"parserOptions": {
		"tsconfigRootDir": __dirname,
		"extraFileExtensions": [".vue"]
	},
	"rules": {
		"vue/multi-word-component-names": ["off"],
		"vue/html-indent": ["error", "tab"]
	}
};