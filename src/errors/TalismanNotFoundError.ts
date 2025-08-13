import { BaseError } from "./BaseError";

export class TalismanNotFoundError extends BaseError {
    constructor() {
        super("Talisman não encontrado.", "TalismanNotFoundError", 404);
    }
}