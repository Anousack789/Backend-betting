'use strict';
const express = require('express');
const database = require('../utils/database');
const passport = require('passport');
const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res) => {});

module.exports = router;
