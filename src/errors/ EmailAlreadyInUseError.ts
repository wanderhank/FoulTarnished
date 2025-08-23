import {BaseError} from "./BaseError";

export class  EmailAlreadyInUseError extends BaseError {
    constructor() {
        super("Email já cadastrado.", " EmailAlreadyInUseError", 409);
    }
}