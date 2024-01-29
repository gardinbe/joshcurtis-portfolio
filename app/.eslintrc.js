/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable quote-props */
/* eslint-disable quotes */

const { join } = require("path");

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
		"project": "tsconfig.json",
		"extraFileExtensions": [".vue"]
	},
	"settings": {
		"import/resolver": {
			"typescript": {
				"project": join(__dirname, "tsconfig.json")
			}
		}
	},
	"rules": {
		"vue/multi-word-component-names": ["off"],
		"vue/html-indent": ["error", "tab"]
	}
};