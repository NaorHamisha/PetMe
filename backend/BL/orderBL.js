const Order = require('../models/order');
const Stock = require("../models/stock");

const updateProductQuantity = require("../handlers/stockHandler");

const getOrdersByUserId = (req, res) => {
    Order.find({user: req.query.userId}).populate('user').deepPopulate('products.product').then((response) => {
        res.send(response);
    }).catch((e) => {
        console.log(`there was a problem...${e.message}`);
    });
}

const getAllOrders = (req, res) => {
    Order.find().populate('user').deepPopulate('products.product').then((response) => {
        res.send(response);
    }).catch((e) => {
        console.log(`there was a problem...${e.message}`);
    });
}

const getLastWeekOrders = (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    Order.find({
        date: {$gte: sevenDaysAgo, $lt: new Date()},
    }).populate('user').deepPopulate('products.product')
        .then((response) => {
            res.send(response);
        })
        .catch((e) => {
            console.log(`there was a problem...${e.message}`);
        });
}

const createOrder = (req, res) => {
    Order.create(
        {
            ...req.body
        }
    ).then((response) => {
        response.products.map(product => Stock.findOne({product: product.product})
            .then((stock) => updateProductQuantity(product.product, stock.quantity - product.quantity)))
        res.send(response);
    }).catch((e) => {
        console.log(`there was a problem...${e.message}`);
    });
}

function getOrdersByUser(req, res) {
    Order.aggregate([
        {
            $group: {
                _id: "$user",
                count: {$sum: 1}
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 0,
                user: "$user.name",
                userId: "$user._id",
                userMail: "$user.mail",
                orderCount: "$count"
            }
        }
    ]).then(result => {
        console.log(result)
        res.send(result);
    })
        .catch(error => {
            console.log(error)
        })
}

module.exports = {
    getOrdersByUserId,
    getAllOrders,
    getLastWeekOrders,
    createOrder,
    getOrdersByUser
}