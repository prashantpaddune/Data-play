const path = require('path');

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const envConfig = dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenvExpand.expand(envConfig);