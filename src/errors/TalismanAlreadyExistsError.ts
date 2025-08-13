import {BaseError} from "./BaseError";

export class TalismanAlreadyExistsError extends BaseError {
    constructor() {
        super("Talisman com esse ID já existe.", "TalismanAlreadyExistsError", 409);
    }
}