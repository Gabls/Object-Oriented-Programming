export class EmailUnavailableError extends Error{
    public readonly name = "EmailUnavailableError"
    constructor(){
        super("E-mail unavailable. Try again!")
    }
}

export class LoginIncorrect extends Error{
    public readonly name = "LoginIncorrect"
    constructor(){
        super("Email and/or password is incorrect. Try again!")
    }
}

export class AccountNotExist extends Error{
    public readonly name = "AccountNotExist"
    constructor(){
        super("An account with that email does not exist. Try again!")
    }
}

export class BikeInvalidID extends Error{
    public readonly name = "BikeInvalidID"
    constructor(){
        super("Invalid ID. Try again!")
    }
}

export class BikeNotCurrentyAvailable extends Error{
    public readonly name = "BikeNotCurrentyAvailable"
    constructor(){
        super("This bike is not currently available. Try again!")
    }
}

export class RentNonExist extends Error{
    public readonly name = "RentNonExist"
    constructor(){
        super("Non-existent rent. Try again!")
    }
}