"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Bike {
    constructor(name, type, rate, body_size, description, price_per_hour) {
        this.id = crypto_1.default.randomUUID();
        this.name = name;
        this.type = type;
        this.rate = rate;
        this.availability = true;
        this.body_size = body_size;
        this.description = description;
        this.price_per_hour = price_per_hour;
    }
}
exports.Bike = Bike;
//# sourceMappingURL=Bike.js.map