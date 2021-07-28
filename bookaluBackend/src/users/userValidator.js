const Joi = require('joi');

/**
 * Add User
 * @param {*} data 
 * @returns 
 */
async function addUser(data) {
    const schema = Joi.object({
        title: Joi.string().required().allow(''),
        firstName: Joi.string().required().allow('').min(1).max(50),
        lastName: Joi.string().required().allow('').min(1).max(50),
        emailId: Joi.string().required().min(1).max(500),
        addressLine1: Joi.string().required().allow(''),
        addressLine2: Joi.string().required().allow(''),
        town: Joi.string().required().allow(''),
        postCode: Joi.string().required().allow('').min(1).max(50),
        county: Joi.string().required().allow('').min(1).max(2000),
        country: Joi.string().required().allow('').min(1).max(50),
        telephone: Joi.string().required().allow('').min(1).max(50),
        mobile: Joi.string().required().allow('').min(1).max(50),
        password: Joi.string().required().min(8).max(30),
        defaultTimeZone: Joi.string().required().allow('').min(1).max(2000),

    });
    return schema.validateAsync(data);
}

/**
 * Check user email
 * @param {*} data 
 */
async function checkEmail(data) {
    const schema = Joi.object({
        email: Joi.string().required().allow('').min(1).max(500),
    });
    return schema.validateAsync(data);
}

module.exports = {
    addUser,
    checkEmail
};