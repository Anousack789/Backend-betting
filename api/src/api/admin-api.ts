import express from 'express';
import database from '../utils/database';
import passport from 'passport';
const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res) => {});

export default router;
