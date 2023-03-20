const express = require('express');
const { getUserByUid, getUserById, getAllUsers, createUser } = require('../BL/userBL');

const router = express.Router();

router.post('/', async (req, res) => {
    createUser(req, res);
});

router.get('/all', async (req, res) => {
    getAllUsers(req, res);
});

router.get('/:id', (req, res) => {
    getUserById(req, res);
});

router.get('/user/:uid', async (req, res) => {
    getUserByUid(req, res);
});

module.exports = router;