/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const _ = require("lodash");
const baseCfg = require("../.eslint-base.json");

module.exports = _.mergeWith({}, baseCfg, {
	"parserOptions": {
		"tsconfigRootDir": __dirname
	}
});