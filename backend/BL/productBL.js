const Product = require('../models/product');

const getProductById = (req, res) => {
  Product.findOne({_id: req.params.id}).populate('category').then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`there was a problem...${e.message}`);
  });
}

const getAllProducts = (req, res) => {
  Product.find().populate('category').then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`there was a problem...${e.message}`);
  });
}

const createProduct = (req, res) => {
  Product.create(
    {
      ...req.body.params
    }
  ).then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`there was a problem...${e.message}`);
  });
}

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
}