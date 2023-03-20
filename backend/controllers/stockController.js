const express = require('express');
const  {
    getStockByProductId,
    getAllStocks,
    createStock,
    updateStockByProductId,
  } = require('../BL/stockBL');

const router = express.Router();

router.get('/getStockByProductId', async (req, res) => {
    getStockByProductId(req, res);
});

router.get('/all', async (req, res) => {
    getAllStocks(req, res);
});

router.post('/', async (req, res) => {
    createStock(req, res);
});

router.put('/updateStockByProductId', async (req, res) => {
    updateStockByProductId(req, res);
});

module.exports = router;