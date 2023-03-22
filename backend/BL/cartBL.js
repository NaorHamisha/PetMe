const Cart = require('../models/cart');
const User = require("../models/user");
const Product = require("../models/product");

const getCartByUserId = (req, res) => {
    Cart.findOne({user: req.query.id}).deepPopulate('products.product').then((response) => {
        res.send(response);
    }).catch((e) => {
        console.log(`there was a problem...${e.message}`);
    });
}

async function removeProductFromCart(req, res) {
    try {
        const currentCart = await Cart.findOne({
            user: req.body.userId
        }).deepPopulate('products.product');
        const currentProduct = currentCart.products.filter(product => product._doc.product._doc._id === req.body.productId);

        if (currentProduct.length === 0) {
            console.log('the product is not in the cart')
        } else {
            currentProduct[0]._doc.quantity -= 1;
            if (currentProduct[0]._doc.quantity === 0) {
                currentCart.products = currentCart.products.filter(p => p.product._id !== req.body.productId)
            } else {
                currentCart.products.map(p => p.product._id !== req.body.productId ? p : currentProduct[0])
            }
        }

        currentCart.markModified('products');
        res.send(await currentCart.save())
    }
    catch(err) {
        console.log(err);
    }
}

async function addProductToCart(req, res) {
    try {
        console.log(req.body);
        const currentCart = await Cart.findOne({
            user: req.body.userId
        }).deepPopulate('products.product');
        console.log("Desired: " + req.body.productId);
        const currentProduct = currentCart.products.filter(product => {
            console.log("DBsss:" + product._doc.product._doc._id);
            return product._doc.product._doc._id === req.body.productId
    });

        if (currentProduct.length === 0) {
            const product = await Product.findById(req.body.productId);
            currentCart.products.push({product: product, quantity: 1});
        } else {
            currentProduct[0]._doc.quantity += 1;
            currentCart.products.map(p => p.product._id !== req.body.productId ? p : currentProduct[0])
        }

        currentCart.markModified('products');
        res.send(await currentCart.save())
    }
    catch(err) {
        console.log(err);
    }
}

async function emptyCart(req, res) {
    try {
        const currentCart = await Cart.findOne({
            user: req.body.userId
        }).deepPopulate('products.product');
        currentCart.products = [];

        currentCart.markModified('products');
        res.send(await currentCart.save())
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    getCartByUserId,
    addProductToCart,
    removeProductFromCart,
    emptyCart
}