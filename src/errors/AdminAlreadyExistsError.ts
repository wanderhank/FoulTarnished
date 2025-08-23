import {BaseError} from "./BaseError";

export class  AdminAlreadyExistsError extends BaseError {
    constructor() {
        super("Admin já cadastrado.", " AdminAlreadyExistsError", 409);
    }
}