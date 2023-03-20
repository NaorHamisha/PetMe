const express = require('express');
const{ getProductById, getAllProducts, createProduct } = require('../BL/productBL');
const router = express.Router();

router.get('/all', async (req, res) => {
  getAllProducts(req, res);
});

router.get('/:id', (req, res) => {
  getProductById(req, res);
});

router.post('/', async (req, res) => {
  createProduct(req, res);
});

module.exports = router;