const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/admin', passport.authenticate('jwt', { session: false }));
router.get('/admin/profile', async (req, res) => {});

module.exports = router;
