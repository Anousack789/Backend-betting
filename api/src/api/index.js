'use strict';
const express = require('express');
const adminApi = require('./admin-api');
const agentApi = require('./agent-api');
const playerApi = require('./player-api');
const userApi = require('./user-api');

const router = express.Router();
router.use('/admin', adminApi);
router.use('/agent', agentApi);
router.use('/player', playerApi);
router.use('/user', userApi);

module.exports = router;
