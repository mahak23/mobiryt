const crypto = require('crypto');
const { config } = require('../config/config');

class AESEncryption {
    static key = config.encryption_key;
    static iv = config.encryption_iv

    /**
     * Encrypt the text
     * @param {*} messagetext 
     * @returns 
     */
    static encrypt(messagetext) {
        const cipher = crypto.createCipheriv('aes-192-cbc', this.key, this.iv);
        return cipher.update(messagetext, 'utf8', 'hex') + cipher.final('hex');
    }

    /**
     * Decrypt the text
     * @param {*} ciphertext 
     * @param {*} key 
     * @returns 
     */
    static decrypt(ciphertext) {
        const decipher = crypto.createDecipheriv('aes-192-cbc', this.key, this.iv);
        return decipher.update(ciphertext, 'hex', 'utf8') + decipher.final('utf8');
    }
}

module.exports = AESEncryption;