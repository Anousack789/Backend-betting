'use strict';
const express = require('express');
const adminApi = require('./admin-api');
const agentApi = require('./agent-api');
const playerApi = require('./player-api');
const authApi = require('./auth-api');
const menuApi = require('./menu-api');
const walletApi = require('./wallet-api');
const transactionApi = require('./transaction-api');
const masterAgentApi = require('./master-agent-api');

const router = express.Router();
router.use(adminApi);
router.use(agentApi);
router.use(playerApi);
router.use(authApi);
router.use(menuApi);
router.use(walletApi);
router.use(transactionApi);
router.use(masterAgentApi);

module.exports = router;
