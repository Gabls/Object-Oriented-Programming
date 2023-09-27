"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentNonExist = exports.BikeNotCurrentyAvailable = exports.BikeInvalidID = exports.AccountNotExist = exports.LoginIncorrect = exports.EmailUnavailableError = void 0;
class EmailUnavailableError extends Error {
    constructor() {
        super("E-mail unavailable. Try again!");
        this.name = "EmailUnavailableError";
    }
}
exports.EmailUnavailableError = EmailUnavailableError;
class LoginIncorrect extends Error {
    constructor() {
        super("Email and/or password is incorrect. Try again!");
        this.name = "LoginIncorrect";
    }
}
exports.LoginIncorrect = LoginIncorrect;
class AccountNotExist extends Error {
    constructor() {
        super("An account with that email does not exist. Try again!");
        this.name = "AccountNotExist";
    }
}
exports.AccountNotExist = AccountNotExist;
class BikeInvalidID extends Error {
    constructor() {
        super("Invalid ID. Try again!");
        this.name = "BikeInvalidID";
    }
}
exports.BikeInvalidID = BikeInvalidID;
class BikeNotCurrentyAvailable extends Error {
    constructor() {
        super("This bike is not currently available. Try again!");
        this.name = "BikeNotCurrentyAvailable";
    }
}
exports.BikeNotCurrentyAvailable = BikeNotCurrentyAvailable;
class RentNonExist extends Error {
    constructor() {
        super("Non-existent rent. Try again!");
        this.name = "RentNonExist";
    }
}
exports.RentNonExist = RentNonExist;
//# sourceMappingURL=Error.js.map