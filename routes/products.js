var express = require('express');
var router = express.Router();
var DB = require('../module/db')
const dbsample = new DB();

router.get('/', async (req, res, next) => {
  let data = null;

  data = await dbsample.mockData();

  let realData = await dbsample.read();

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
  let result = await dbsample.delete(id)
  res.json(result)

});

router.get('/edit/:id', async (req, res, next) => {
  let id = req.params.id;
  let realData = await dbsample.read();
  index = realData.findIndex(item =>
    item.id == id
  )
  res.render('edit-product', {
    title: 'Data',
    data: realData
  })
});

router.post('/edit/:id', async (req, res, next) => {
  let id = req.params.id || 0;
  let result = await dbsample.update(id, req.body);
  res.json(result)
})

module.exports = router;