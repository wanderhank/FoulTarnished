import { BaseError } from "./BaseError";

export class ArmorAlreadyExistsError extends BaseError {
    constructor() {
        super("Esta armadura já existe.", "ArmorAlreadyExistsError", 409);
    }
}
