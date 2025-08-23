import { BaseError } from "./BaseError";

export class ShieldNotFoundError extends BaseError {
    constructor() {
        super("Escudo não encontrado.", "ShieldNotFoundError", 404);
    }
}