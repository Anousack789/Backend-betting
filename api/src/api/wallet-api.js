'use strict';
const passport = require('passport');
const router = require('express').Router();
router.use('/wallet', passport.authenticate('jwt', { session: false }));
module.exports = router;
