const express = require('express');
const{
    getCartByUserId,
    addProductToCart,
    removeProductFromCart,
    emptyCart
} = require('../BL/cartBL');

const router = express.Router();

router.get('/:userId', async (req, res) => {
    getCartByUserId(req, res);
});

router.post('/emptyCart', async (req, res) => {
    await emptyCart(req, res)
});

router.post('/removeProductFromCart', async (req, res) => {
    await removeProductFromCart(req, res);
});

router.post('/addProductTo', async (req, res) => {
    await addProductToCart(req, res);
});

module.exports = router;