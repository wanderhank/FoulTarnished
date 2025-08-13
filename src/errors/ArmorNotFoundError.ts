
import { BaseError } from "./BaseError";

export class ArmorNotFoundError extends BaseError {
    constructor() {
        super("Armadura não encontrada.", "ArmorNotFoundError", 404);
    }
}