const path = require('path');

const express = require('express');
const Cart = require('../models/cart');

const { isLoggedIn } = require('./helpers');


const router = express.Router();

// 장바구니 전체조회
router.get('/carts', async (req, res, next) => {});

// 장바구니 물품 삭제
// get 대신에 delete 쓰면 안되나?
router.get('/carts/:id', async (req, res, next) => {});

// 장바구니 물품 개수 변경
router.post('/carts/:id', async (req, res, next) => {});

module.exports = router;
