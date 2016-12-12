var Paypal = require('paypal-express-checkout');
var constants = require('../config/constants');
var env = process.env.NODE_ENV || 'dev';

var paypal = Paypal.init(constants[env].paypal.username, constants[env].paypal.password, constants[env].paypal.signature, constants[env].paypal.return, constants[env].paypal.cancel, constants[env].paypal.debug)

module.exports = paypal;