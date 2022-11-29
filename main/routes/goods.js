const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/goods');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll({
                attributes: ['id']
            });
            res.locals.title = require('../package.json').name;
            res.locals.port = process.env.PORT;
            res.locals.users = users.map(v => v.id);
            res.render('user');
        } catch (err) {
            console.error(err);
            next(err);
            //
        }
    })


module.exports = router;
