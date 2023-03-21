const Stock = require('../models/stock');
const updateProductQuantity = require("../handlers/stockHandler")

const getStockByProductId = (req, res) => {
  Stock.findOne({product: req.query.id}).then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`there was a problem...${e.message}`);
  });
}

const getAllStocks = (req, res) => {
  Stock.find().populate('product').then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`there was a problem...${e.message}`);
  });
}

const createStock = (req, res) => {
  Stock.create(
    {
      ...req.body
    }
  ).then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`there was a problem...${e.message}`);
  });
}

const updateStockByProductId = (req, res) => {
  updateProductQuantity(req.body.product, req.body.quantity, res);
}

module.exports = {
  getStockByProductId,
  getAllStocks,
  createStock,
  updateStockByProductId,
}