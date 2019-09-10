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

});

router.get('/new', (req, res, next) => {
  res.render('new-product')
})

router.post('/', async (req, res, next) => {
  let result = await dbsample.create(req.body);
  res.json(result)
})

router.get('/delete/:id', async (req, res, next) => {
  let id = req.params.id
  dbsample.delete(id)
});

module.exports = router;