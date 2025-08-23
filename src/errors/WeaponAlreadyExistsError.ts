import {BaseError} from "./BaseError";

export class WeaponAlreadyExistsError extends BaseError {
    constructor() {
        super("Arma com esse ID já existe.", "WeaponAlreadyExistsError", 409);
    }
}