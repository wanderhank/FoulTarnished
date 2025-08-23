import { BaseError } from "./BaseError";

export class WeaponNotFoundError extends BaseError {
    constructor() {
        super("Arma não encontrado.", "WeaponNotFoundError", 404);
    }
}