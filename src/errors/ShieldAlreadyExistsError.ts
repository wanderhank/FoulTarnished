import {BaseError} from "./BaseError";

export class ShieldAlreadyExistsError extends BaseError {
    constructor() {
        super("Escudo com esse ID já existe.", "ShieldAlreadyExistsError", 409);
    }
}