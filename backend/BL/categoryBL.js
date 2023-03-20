const Category = require('../models/category');

const getCategoryById = (req, res) => {
  Category.findOne({_id: req.params.id}).then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`there was a problem...${e.message}`);
  });
}

const getAllCategories = (req, res) => {
  Category.find().then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`there was a problem...${e.message}`);
  });
}

const createCategory = (req, res) => {
  Category.create(
    {
      ...req.body
    }
  ).then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`there was a problem...${e.message}`);
  });
}

module.exports = {
  getCategoryById,
  getAllCategories,
  createCategory
}