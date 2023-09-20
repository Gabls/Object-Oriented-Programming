"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.token = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.token = bcrypt_1.default.genSaltSync(3);
class Client {
    constructor(name, email, password) {
        this.id = crypto_1.default.randomUUID();
        this.name = name;
        this.email = email;
        this.password = bcrypt_1.default.hashSync(password, exports.token);
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map