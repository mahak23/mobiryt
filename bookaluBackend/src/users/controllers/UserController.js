class UserController {
    /**
     * Get the user informatiom
     * @param {*} user 
     */
    static getUserInfo(user) {
        console.log(user);
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
}

module.exports = UserController