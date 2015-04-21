var express = require('express');
var router = express.Router();
var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill(process.env.mandrill_key);

/* GET users listing. */
router.post('/contact', function(req, res, next) {
  console.log(process.env.mandrill_key);
});

module.exports = router;
