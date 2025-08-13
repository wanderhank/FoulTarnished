export class BaseError extends Error {
    public statusCode: number;

    constructor(message: string, name: string, statusCode = 500) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, new.target.prototype);
    }


}

