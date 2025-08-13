import {BaseError} from "./BaseError";

export class RequiredFieldsAreMissingError extends BaseError {
    constructor() {
        super("Campos obrigatórios ausentes ou inválidos.", "RequiredFieldsAreMissingError", 400);
    }
}