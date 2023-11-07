const crypto = require("crypto")

exports.generateSalt = () => {
    return crypto.randomBytes(16).toString("base64")
}

exports.encryptPassword = (password, salt) => {
    return crypto.createHash("RSA-SHA256").update(password).update(salt).digest("hex")
}