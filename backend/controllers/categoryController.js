const express = require('express');
const{ getCategoryById, getAllCategories, createCategory } = require('../BL/categoryBL');

const router = express.Router();

router.post('/', async (req, res) => {
    createCategory(req, res);
});

router.get('/all', async (req, res) => {
    getAllCategories(req, res);
});

router.get('/:id', (req, res) => {
    getCategoryById(req, res);
});

module.exports = router;