const express = require('express');
const bcrypt = require('bcrypt')
const Goods = require('../models/goods');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {})

//get 물품 조회
router.get('/product/:id', async (req, res, next) => {});
//get 세트 조회
router.get('/package/:id', async (req, res, next) => {});

//질문:장바구니 라우터에 있어야 하는가? 물품 라우터에 있어야 하는가?
//post 물품 장바구니 등록 
router.post('/product/:id/cart', async (req, res, next) => {});
//post 세트 장바구니 등록 
router.post('/package/:id/cart', async (req, res, next) => {});

//post 물품 찜목록 등록 
router.post('/product/:id/pick', async (req, res, next) => {});
//post 세트 찜목록 등록 
router.post('/package/:id/pick', async (req, res, next) => {});

//리뷰
//질문: 외부 리뷰 어떻게 처리할 지
//리뷰 조회
router.get('/product/:id/reviews',async(req, res, next) => {});
//작성 폼
router.get('/product/:id/reviews/form',async(req, res, next) => {});
router.get('/package/:id/reviews/form',async(req, res, next) => {});
//post 작성/수정
router.post('/product/:id/reviews',async(req, res, next) => {});
router.post('/package/:id/reviews',async(req, res, next) => {});
//get 삭제
//질문: delete 사용 여부
router.get('/delete/product/:id/reviews',async(req, res, next) => {});
router.get('/delete/package/:id/reviews',async(req, res, next) => {});

module.exports = router;
