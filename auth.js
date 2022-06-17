const crypto = require("crypto");
const { expressjwt } = require("express-jwt");

const dotenv = require("dotenv").config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

exports.encryptSHA256 = input => crypto.createHash("sha256").update(input).digest("hex");
exports.requireAuthMiddleware = expressjwt({ secret: TOKEN_SECRET, algorithms: ["HS256"] });