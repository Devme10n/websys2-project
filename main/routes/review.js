const express = require('express');
const {  Review } = require('../models');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

//리뷰 수정
router.post('/update',isLoggedIn,async (req, res, next) => {
    try {
        const result = await Review.update({
            title: req.body.title,
            rate: req.body.rate,
            description: req.body.description,
            imgUrls: req.body.imgUrls
        }, {
            where: { id: req.body.id }
        });

        if (result) res.status(200).json({"result": "success", "message": "리뷰가 업데이트 되었습니다."});
        else next(res.status(409).json({"result": "fail", "error": '작성한 리뷰를 찾을 수 없습니다.' }));
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//리뷰 삭제
router.get('/delete/:id',isLoggedIn, async (req, res, next) => {
    try {
        const result = await Review.destroy({
            where: { id: req.params.id }
        });

        if (result) res.status(200).json({"result": "success", "message": "리뷰가 삭제 되었습니다."});
        else next(res.status(409).json({"result": "fail", "error": '작성한 리뷰를 찾을 수 없습니다.' }));
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//내가 작성한 리뷰 조회
router.get('/myReviews', async (req, res,next) => {
    try {
        const result = await Review.findAll({
            where: { userId: req.user.id }
        });

        if (result) res.json(result);
        else next('There is no reviews');
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;