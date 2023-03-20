const express = require('express');
const {
    getOrdersByUserId,
    getAllOrders,
    getLastWeekOrders,
    createOrder,
    getOrdersByUser
} = require('../BL/orderBL');

const router = express.Router();

router.post('/', async (req, res) => {
    createOrder(req, res);
});

router.get('/:userId', async (req, res) => {
    getOrdersByUserId(req, res);
});

router.get('/all', async (req, res) => {
    getAllOrders(req, res);
});

router.get('/getLastWeekOrders', async (req, res) => {
    getLastWeekOrders(req, res);
});

router.get('/getOrdersByUser', async (req, res) => {
    getOrdersByUser(req, res);
});

module.exports = router;