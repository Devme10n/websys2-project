const express = require('express');
const { Product, Category } = require('../models');

const router = express.Router();

// 카테고리 목록 조회
router.get('/', async (req, res, next) => {
    try {
        const categoryList = await Category.findAll({
        });
        res.json(categoryList)
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 카테고리별로 상품 목록 조회하기
router.get('/:id', async (req, res, next) => {
    try {
        const categoryProductList = await Product.findAll({
            where: { categoryId: req.params.id }
        });
        res.json(categoryProductList)
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;