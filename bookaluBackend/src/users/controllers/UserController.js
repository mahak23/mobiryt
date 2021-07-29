const { User } = require('../models/userModel');
const { sequelize } = require("../../../dbConnection");
const errorHandler = require('../../../libs/errorHandler');
const validator = require('../validators/userValidator');

class UserController {

    /**
     * Get the user informatiom
     * @param {*} user 
     */
    static async getUserInfo(user) {
        return {
            status: 200,
            data: {
                message: "User found successfully",
                data: {
                    "firstName": user.firstName,
                    "LastName": user.LastName,
                    "mobile": user.mobile,
                    "telephone": user.telephone,
                    "postalCode": user.postalCode,
                    "emailId": user.emailId,
                    "addressLine1": user.addressLine1,
                    "addressLine2": user.addressLine2,
                    "town": user.town,
                    "county": user.county,
                    "country": user.country
                }
            }
        };
    }

    /**
     * Update User informatiom
     * @param {*} user 
     */
    static async updateUserInfo(user, body) {
        const t = await sequelize.transaction();
        try {
            const data = await validator.updateUserInfo(body);

            // If email is changed update login information
            if (user.emailId != data.emailId) {
                let loginData = await user.getLogin();
                console.log(loginData.toJSON());
                loginData.loginName = data.emailId;
                await loginData.save({ transaction: t });
            }

            // update the user
            await User.update(data, {
                where: {
                    id: user.id
                },
                transaction: t
            });

            await t.commit();

            return {
                status: 200,
                data: {
                    message: "User information has been updated successfully!"
                }
            };
        } catch (error) {
            await t.rollback();
            return errorHandler.handleError(err);
        }
    }
}

module.exports = UserController