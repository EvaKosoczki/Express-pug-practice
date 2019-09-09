var express = require('express');
var router = express.Router();
var DB = require('../module/db')

router.get('/', async (req, res, next) => {
  let dbsample = new DB();
  let data = null;

  data = await dbsample.mockData()

  res.render('products', {
    titles: 'sth',
    data: data
  })

})

module.exports = router;