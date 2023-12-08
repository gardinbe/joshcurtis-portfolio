/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const _ = require("lodash");
const baseCfg = require("../.eslint-base.json");

module.exports = _.mergeWith({}, baseCfg, {
	"extends": [
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
});