/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable quote-props */
/* eslint-disable quotes */

const { join } = require("path");

module.exports = {
	"extends": [
		"../.eslintrc"
	],
	"parserOptions": {
		"tsconfigRootDir": __dirname,
		"project": "tsconfig.json"
	},
	"settings": {
		"import/resolver": {
			"typescript": {
				"project": join(__dirname, "tsconfig.json")
			}
		}
	}
};