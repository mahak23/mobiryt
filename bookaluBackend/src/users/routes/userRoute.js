const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');
const LoginController = require('../controllers/LoginController');

// Register User
router.post('/', async (req, res, next) => {
    try {
        const result = await RegisterController.addUser(req.body);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

// Check user exists by email or not
router.post('/checkemail', async (req, res, next) => {
    try {
        const result = await RegisterController.checkEmail(req.body);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

// Login
router.post('/login', async (req, res, next) => {
    try {
        const result = await LoginController.login(req.body);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

module.exports = router;