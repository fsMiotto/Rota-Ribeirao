class TokenExpiredError extends Error{
    constructor(message){
        super(message);

        this.name = "TokenExpiredError";
    }
}

class UnautorizedError extends Error{
    constructor(message){
        super(message);

        this.name = "UnautorizedError";
    }
}