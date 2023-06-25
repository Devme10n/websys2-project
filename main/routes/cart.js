const path = require('path');

const express = require('express');
const Cart = require('../models/carts');
const { Product, Order } = require('../models');

const { isLoggedIn } = require('./helpers');


const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const myCarts = await Cart.findAll({
            where: { userId: req.user.id },
            include: { 
                model: Product,
            }
        });
        
        if (myCarts) { res.json(myCarts); } 
        else next(`There is no cart with ${req.user.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//삭제
/** 
req: product.id
res:
 */
router.get('/delete/:id', isLoggedIn, async (req, res, next) => {
    try {
        //Carts 객체에서 product id로 삭제
        const result = await Cart.destroy({
            where: { id: req.params.id }
        });

        if (result) res.json({"result": "success", "message": "삭제되었습니다."});
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// product cart 등록
router.post('/product', isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const { productId } = req.body
    const productInfo = await Product.findOne({
        where: { id: req.body.productId }
    })
    try {     
        const result = await Cart.create({
            userId: userId,
            productId: req.body.productId,
            productName: productInfo.name,
            productPrice: productInfo.price,
            productDiscount: productInfo.discount
        });
        res.status(200).json({"result": "success", "message": "cart 등록이 완료되었습니다."});
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/order', isLoggedIn, async (req,res,next)=>{
    const { receiverAddress }= req.body

    const myCarts = await Cart.findAll({
        where: { userId: req.user.id },
        include: {
            model: Product,
        }
    });
    // console.log(myCarts[0].productPrice)
    console.log("id" + myCarts[0]['Product'].id)
    console.log("name" + myCarts[0]['Product'].name)
    console.log("price" + myCarts[0]['Product'].price)
    console.log("discount" + myCarts[0]['Product'].discount)


    for (i = 0; i < myCarts.length; i++) {
        const totalPrice = myCarts[i]['Product'].price * (100 - myCarts[i]['Product'].discount) / 100
        try {
            const result = await Order.create({
                userId: req.user.id,
                productId: myCarts[i]['Product'].id,
                productName: myCarts[i]['Product'].name,
                productPrice: myCarts[i]['Product'].price,
                productDiscount: myCarts[i]['Product'].discount,
                receiverAddress: req.body.receiverAddress,
                totalPrice: totalPrice
            });
            res.status(200).json({"result": "success", "message": "cart 등록이 완료되었습니다."});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    

});



module.exports = router;
