var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');

// Get profile information
router.get('/', async (req, res, next) => {
    try {
        const result = await UserController.getUserInfo(req.user);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

module.exports = router;