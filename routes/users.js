var express = require('express');
var router = express.Router();

const control = require('../controllers/user.js')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.get('/users', control.findAll)
router.get('/users/:id', control.findOne)
router.post('/users', control.create)
router.delete('/users/:id', control.destroy)
router.put('/users/:id', control.update)



module.exports = router;
