"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressjwt = exports.UnauthorizedError = void 0;
var jwt = require("jsonwebtoken");
var express_unless_1 = require("express-unless");
var UnauthorizedError_1 = require("./errors/UnauthorizedError");
var UnauthorizedError_2 = require("./errors/UnauthorizedError");
Object.defineProperty(exports, "UnauthorizedError", { enumerable: true, get: function () { return UnauthorizedError_2.UnauthorizedError; } });
/**
 * Returns an express middleware to verify JWTs.
 *
 * @param options {Params}
 * @returns
 */
var expressjwt = function (options) {
    if (!(options === null || options === void 0 ? void 0 : options.secret))
        throw new RangeError('express-jwt: `secret` is a required option');
    if (!options.algorithms)
        throw new RangeError('express-jwt: `algorithms` is a required option');
    if (!Array.isArray(options.algorithms))
        throw new RangeError('express-jwt: `algorithms` must be an array');
    var getVerificationKey = typeof options.secret === 'function' ?
        options.secret :
        function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, options.secret];
        }); }); };
    var credentialsRequired = typeof options.credentialsRequired === 'undefined' ? true : options.credentialsRequired;
    var requestProperty = typeof options.requestProperty === 'string' ? options.requestProperty : 'auth';
    var middleware = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, hasAuthInAccessControl, authorizationHeader, parts, scheme, credentials, decodedToken, key, isRevoked, _a, request, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        if (req.method === 'OPTIONS' && 'access-control-request-headers' in req.headers) {
                            hasAuthInAccessControl = req.headers['access-control-request-headers']
                                .split(',')
                                .map(function (header) { return header.trim().toLowerCase(); })
                                .includes('authorization');
                            if (hasAuthInAccessControl) {
                                return [2 /*return*/, next()];
                            }
                        }
                        authorizationHeader = req.headers && 'Authorization' in req.headers ? 'Authorization' : 'authorization';
                        if (!(options.getToken && typeof options.getToken === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, options.getToken(req)];
                    case 1:
                        token = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (req.headers && req.headers[authorizationHeader]) {
                            parts = req.headers[authorizationHeader].split(' ');
                            if (parts.length == 2) {
                                scheme = parts[0];
                                credentials = parts[1];
                                if (/^Bearer$/i.test(scheme)) {
                                    token = credentials;
                                }
                                else {
                                    if (credentialsRequired) {
                                        throw new UnauthorizedError_1.UnauthorizedError('credentials_bad_scheme', { message: 'Format is Authorization: Bearer [token]' });
                                    }
                                    else {
                                        return [2 /*return*/, next()];
                                    }
                                }
                            }
                            else {
                                throw new UnauthorizedError_1.UnauthorizedError('credentials_bad_format', { message: 'Format is Authorization: Bearer [token]' });
                            }
                        }
                        _b.label = 3;
                    case 3:
                        if (!token) {
                            if (credentialsRequired) {
                                throw new UnauthorizedError_1.UnauthorizedError('credentials_required', { message: 'No authorization token was found' });
                            }
                            else {
                                return [2 /*return*/, next()];
                            }
                        }
                        decodedToken = void 0;
                        try {
                            decodedToken = jwt.decode(token, { complete: true });
                        }
                        catch (err) {
                            throw new UnauthorizedError_1.UnauthorizedError('invalid_token', err);
                        }
                        return [4 /*yield*/, getVerificationKey(req, decodedToken)];
                    case 4:
                        key = _b.sent();
                        try {
                            jwt.verify(token, key, options);
                        }
                        catch (err) {
                            throw new UnauthorizedError_1.UnauthorizedError('invalid_token', err);
                        }
                        _a = options.isRevoked;
                        if (!_a) return [3 /*break*/, 6];
                        return [4 /*yield*/, options.isRevoked(req, decodedToken)];
                    case 5:
                        _a = (_b.sent());
                        _b.label = 6;
                    case 6:
                        isRevoked = _a || false;
                        if (isRevoked) {
                            throw new UnauthorizedError_1.UnauthorizedError('revoked_token', { message: 'The token has been revoked.' });
                        }
                        request = req;
                        request[requestProperty] = decodedToken.payload;
                        next();
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _b.sent();
                        return [2 /*return*/, next(err_1)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    middleware.unless = express_unless_1.unless;
    return middleware;
};
exports.expressjwt = expressjwt;