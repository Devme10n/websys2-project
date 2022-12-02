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
router.get('/', async (req, res, next) => {
    try {
        //로그인된 유저의 carts DB에서 cart list를 가져옴
        const carts = await Carts.findAll({
            attributes: ['id']
        });

        res.locals.title = require('../package.json').name;
        res.locals.port = process.env.PORT;
        res.locals.users = carts.map(v => v.id);
        res.render('carts');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//삭제
/** 
req:
res:
 */
router.get('/delete/:id', async (req, res, next) => {
    try {
        //Carts 객체에서 Goods id로 삭제
        const result = await Carts.destroy({
            where: { id: req.params.id }
        });

        if (result) res.redirect('/');
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//물건 개수 변경 update
/** 
req: 
res: 
body: 
 */
router.post('/update/:id', async (req, res, next) => {
    try {
        //carts 객체에서 검색한 물품의 개수를 변경함
        const result = await Carts.update({
            description: req.body.description
        }, {
            where: { id: req.body.id }
        });

        if (result) res.redirect('/');
        else next('Not updated!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
