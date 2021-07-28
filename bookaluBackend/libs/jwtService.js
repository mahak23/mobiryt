'use strict';

const jwt = require('jsonwebtoken');
const { User } = require('../src/users/models/userModel');

class JwtService {

    /**
     * Handle the errors
     */
    static issueToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2h' });
    }

    static async authenticateToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (token == null) {
                res.status(400).json({
                    message: "Invalid token"
                });
            } else {
                let userId = jwt.verify(token, process.env.TOKEN_SECRET);
                const user = await User.findByPk(userId.userId);
                if (!user) {
                    res.status(400).json({
                        message: "Invalid token"
                    });
                }
                req.user = user;
                next();
            }
        } catch (error) {
            res.status(400).json({
                message: "Invalid token"
            });
        }
    }
}

module.exports = JwtService;