const express = require('express');
const passport = require('passport');

const { logout } = require('./helpers');


const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.status(200).json("로그인 성공"));
        else next(info);
    })(req, res, next);
});

router.get('/logout', logout);

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

module.exports = router;
