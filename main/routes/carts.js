const path = require('path');

const express = require('express');
const Carts = require('../models/carts');

const { isLoggedIn } = require('./helpers');


const router = express.Router();

//장바구니 전체 조회
/** 
req: req.user.id
res: 장바구니 목록, res.locals.carts = {} // 리스트? 객체?
 */
router.get('/', async (req, res, next) => {});

//삭제
/** 
req:
res:
 */
router.get('/delete/:id', async (req, res, next) => {});

//물건 개수 변경 update
/** 
req: 
res: 
body: 
 */
router.post('/update/:id', async (req, res, next) => {});

module.exports = router;
