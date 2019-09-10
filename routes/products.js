var express = require('express');
var router = express.Router();
var DB = require('../module/db')
const dbsample = new DB();

router.get('/', async (req, res, next) => {
  let data = null;

  data = await dbsample.mockData();

  let realData = await dbsample.read();
  console.log(realData[0])

  res.render('products', {
    titles: 'Products',
    data: realData
  })

})

module.exports = router;