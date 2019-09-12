var express = require('express');
var router = express.Router();
var UserDB = require('../module/user')
var userDBSmp = new UserDB()



router.get('/', (req, res, next) => {
  res.render('register')
})
router.post('/', async (req, res, next) => {
  let result = await userDBSmp.create(req.body)
  res.json(result)

})

module.exports = router;