import { BaseError } from "./BaseError";

export class AdminNotFoundError extends BaseError {
    constructor() {
        super("Administrador não encontrado.", "AdminNotFoundError", 404);
    }
}