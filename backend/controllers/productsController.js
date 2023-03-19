const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  getProductById(req, res);
});

router.get('/all', async (req, res) => {
  getAllProducts(req, res);
});

router.post('/', async (req, res) => {
  createProduct(req, res);
});

module.exports = router;