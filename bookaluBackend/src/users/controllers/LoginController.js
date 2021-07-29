const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');
const { Login } = require('../models/loginModel');
const errorHandler = require('../../../libs/errorHandler');
const validator = require('../validators/userValidator');
const JwtService = require('../../../libs/jwtService');

class LoginController {

    /**
     * Login the User
     * @param {*} body 
     * @returns 
     */
    static async login(body) {
        try {
            const data = await validator.login(body);
            const user = await Login.findOne({
                where: {
                    loginName: data.username
                }
            });

            // Username password matching
            if (!user || !bcrypt.compareSync(data.password, user.loginPassword)) {
                return {
                    status: 401,
                    data: {
                        message: "Invalid Email or Password!"
                    }
                };
            }

            // Load the user details
            const userDetails = await User.findByPk(user.userId);

            // Load the user roles
            const accounts = await userDetails.getAccounts();
            const roles = accounts.map((role) => {
                return role.name;
            });

            // Verified user?
            if (!userDetails.isVerified) {
                return {
                    status: 401,
                    data: {
                        message: "User is registered, but has not verified!"
                    }
                };
            }

            if (userDetails.isFirstTimeLoggedIn) {
                userDetails.isFirstTimeLoggedIn = 0;
                await userDetails.save();
            }

            // generate the token and send the response as successfull login
            let token = JwtService.issueToken({ userId: userDetails.id });
            return {
                status: 200,
                data: {
                    accessToken: token,
                    roles: roles,
                    isFirstTimeLoggedIn: !userDetails.isFirstTimeLoggedIn
                }
            };
        } catch (err) {
            return errorHandler.handleError(err);
        }
    }
}

module.exports = LoginController