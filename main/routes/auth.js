const express = require('express');
const passport = require('passport');

const router = express.Router();
// /localhost:{port}/Auth/login
router.post('/login', (req, res, next) => { // local login 전략
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.redirect('/'));
        else next(`Login fail!`);
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao')); // kakao login 전략

router.get('/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

module.exports = router;
