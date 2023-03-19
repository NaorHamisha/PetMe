const User = require('../models/user');
const Cart = require("../models/cart");
const { response } = require('express');

const getUserById = (req, res) => {
  User.findOne({_id: req.params.id}).then((user) => {
    if (user) {
      res.send(user);
    } else {
      console.log('User not found');
      res.send(null);
    }
  }).catch((e) => {
    console.log(`Something went wrong: ${e.message}`);
  });
}

const getUserByUid = (req, res) => {
  User.findOne({uid: req.params.uid}).then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`Something went wrong: ${e.message}`);
  });
}

const getAllUsers = (req, res) => {
  User.find().then((response) => {
    res.send(response);
  }).catch((e) => {
    console.log(`Something went wrong: ${e.message}`);
  });
}

const createUser = (req, res) => {
  User.create(
    {
      ...req.body
    }
  ).then((response) => {
    res.send(response);
    Cart.create(
      {
        user: response._id,
        products: []
      }
  ).then((response) => {
    console.log(response);
  }).catch((e) => {
    console.log(`Something went wrong: ${e.message}`);
  });
  }).catch((e) => {
    console.log(`Something went wrong: ${e.message}`);
  });
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  getUserByUid
}