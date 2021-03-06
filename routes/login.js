var express = require('express');
var router = express.Router();
const UserDB = require('../module/user');
let userDBSmp = new UserDB()

const getToken = (l = 20) => {
  let result = '';
  for (let i = 0; i < l; i++) {
    let index = Math.round(Math.random() * 50 + 65)
    result += String.fromCharCode(index)
  }
  return result;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'Express'
  });
});

router.post('/', async (req, res, next) => {
  let result = await userDBSmp.login(req.body);
  if (result.length === 1) {
    let token = getToken();
    res.cookie('uuid', token);
    await userDBSmp.setUserToken(result[0].id, token);
    return res.redirect('/')
  }
  res.render('login', {
    title: 'Express'
  });

});
module.exports = router;