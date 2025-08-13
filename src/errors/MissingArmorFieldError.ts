import { BaseError } from "./BaseError";

export class MissingArmorFieldError extends BaseError {
    constructor() {
        super("Campo Obrigatório em branco.", "MissingArmorFieldError", 400);
    }
}