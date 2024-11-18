const express = require('express');
const app = express();
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/home', (req, res) => {
    res.send(req.cookies);
});

module.exports = router;