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

});

//삭제
/** 
req: req.params.id
res: delete 여부
 */
router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await Carts.destroy({
            where: { id: req.params.id }
        });

        if (result) res.redirect('/'); // ?
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//물건 개수 변경 update
/** 
req: req.body.id
res: update 여부
body: 
 */
router.post('/update/:id', async (req, res, next) => {
    try {
        const result = await Carts.update({
            description: req.body.description // description -> 개수(count?)
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
