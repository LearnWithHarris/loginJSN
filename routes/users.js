var express = require('express');
var router = express.Router();
const authorizationadmin = require('../helpers/authorizationadmin.js')
const authorization = require('../helpers/authorization.js')
const authentication = require('../helpers/authentication.js')
const control = require('../controllers/user.js')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.get('/users', authentication, control.findAll)
router.get('/users/:id', authentication, authorization, control.findOne)
router.post('/users', authentication, authorizationadmin, control.create)
router.delete('/users/:id', authentication, authorizationadmin, control.destroy)
router.put('/users/:id', authentication, authorization, control.update)
router.post('/users/signin', control.signIn)
router.post('/users/signup', control.create)


module.exports = router;
