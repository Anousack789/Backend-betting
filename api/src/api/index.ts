import express from 'express';
import adminApi from './admin-api';
import agentApi from './agent-api';
import playerApi from './player-api';

const router = express.Router();
router.use('/admin', adminApi);
router.use('/agent', agentApi);
router.use('/player', playerApi);

export default router;
