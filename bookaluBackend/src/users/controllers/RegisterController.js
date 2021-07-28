const bcrypt = require('bcrypt');
const { sequelize } = require("../../../dbConnection");
const { User } = require('../models/userModel');
const { Login } = require('../models/loginModel');
const errorHandler = require('../../../libs/errorHandler');
const validator = require('../validators/userValidator');
const saltRounds = 10;

class RegisterController {
    /**
     * Create User
     * @param {*} data 
     * @returns 
     */
    static async addUser(body) {
        const t = await sequelize.transaction();
        try {
            const data = await validator.addUser(body);

            // check if user already exists
            const result = await this.checkExistingUser(data.emailId);
            if (result.status != 200) {
                return result;
            }

            // Generate salt and has password
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPassword = bcrypt.hashSync(data.password, salt);

            // Make user data
            const userData = {
                title: data.title,
                firstName: data.firstName,
                lastName: data.lastName,
                emailId: data.emailId,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                town: data.town,
                postCode: data.postCode,
                county: data.county,
                country: data.country,
                telephone: data.telephone,
                mobile: data.mobile,
                defaultTimeZone: data.defaultTimeZone,
                isVerified: 0,
                isFirstTimeLoggedIn: 1
            };
            const user = await User.create(userData, { transaction: t });

            // Save the login table data
            const loginData = {
                loginName: data.emailId,
                loginPassword: hashPassword,
                loginPasswordSalt: salt,
                userId: user.id,
                locked: 0,
                active: 1,
            };

            await Login.create(loginData, { transaction: t });
            await t.commit();

            return {
                status: 201,
                data: {
                    message: "Congratulations! Your account is created. Please check your email and verify your account.",
                },
            };
        } catch (err) {
            console.log(err)
            await t.rollback();
            return errorHandler.handleError(err);
        }
    }

    /**
     * Check user by Email
     * @param {*} body 
     */
    static async checkEmail(body) {
        try {
            const data = await validator.checkEmail(body);
            const result = await this.checkExistingUser(data.email);
            return result;
        } catch (err) {
            return errorHandler.handleError(err);
        }
    }

    /**
     * Common function to check exisiting users
     * @param {*} email 
     * @returns 
     */
    static async checkExistingUser(email) {
        // check if user already exists
        const existingUser = await User.findOne({
            where: { emailId: email },
        });

        if (!existingUser) {
            return {
                status: 200,
                data: {
                    message: "Entered Email Id is valid!",
                },
            };
        }

        // User is verified?
        if (existingUser.isVerified) {
            return {
                status: 400,
                data: {
                    message: "User with the same email address exist!"
                }
            }
        }

        return {
            status: 406,
            data: {
                message: "User is registered, but has not verified!"
            }
        }
    }
}

module.exports = RegisterController