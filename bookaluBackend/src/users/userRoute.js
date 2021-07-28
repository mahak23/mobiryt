var express = require('express');
var router = express.Router();

const UserController = require('./userController');

// Register User
router.post('/', async (req, res, next) => {
    try {
        const result = await UserController.addUser(req.body);
        res.status(result.status).send(result.data);
    } catch (error) {
        console.log(error)
        res.status(error.status || 400).send(error.data);
    }
});

// Check user exists by email or not
router.post('/checkemail', async (req, res, next) => {
    try {
        const result = await UserController.checkEmail(req.body);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});


module.exports = router;