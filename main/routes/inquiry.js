const express = require('express');
const { Inquiry } = require('../models');

const { isLoggedIn } = require('./helpers');


const router = express.Router();


// 1대1 문의 작성
router.post('/',isLoggedIn, async(req, res, next) => {
    const userId = req.user.id;
    const { title, description } = req.body;
    try {
        const createInquiry = await Inquiry.create({  
            userId: userId, 
            title, 
            description
         });
        if (createInquiry) res.status(200).json({"result": "success", "message": "문의 작성 완료"});
        else next(res.status(400).json({"result": "fail", "error": "문의 작성 실패" }))
    } catch (err) {
        console.error(err);
        next(err);
    }
});
// 1대1 문의 수정
router.post('/update',isLoggedIn,async (req, res, next) => {
    try {
        const result = await Inquiry.update({  
            title: req.body.title, 
            description:req.body.description
         }, {
            where: { id: req.body.id }
        });

        if (result) res.status(200).json({"result": "success", "message": "문의가 업데이트 되었습니다."});
        else next(res.status(409).json({"result": "fail", "error": '작성한 문의를 찾을 수 없습니다.' }));
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 1대1 문의 삭제
router.get('/delete/:id',isLoggedIn, async (req, res, next) => {
    try {
        const result = await Inquiry.destroy({
            where: { id: req.params.id }
        });

        if (result) res.status(200).json({"result": "success", "message": "문의가 삭제 되었습니다."});
        else next(res.status(409).json({"result": "fail", "error": '작성한 문의를 찾을 수 없습니다.' }));
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 내가 작성한 1대1 문의 조회
router.get('/myInquirys', async (req, res,next) => {
    try {
        const myInquirys = await Inquiry.findAll({
            where: { userId: req.user.id }
        });

        if (myInquirys) res.json(myInquirys);
        else nextres.status(409).json({"result": "fail", "error": '작성한 문의를 찾을 수 없습니다.' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;