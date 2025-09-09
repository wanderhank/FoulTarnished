import { BaseError } from "./BaseError";

export class BuildAlreadyExistsError extends BaseError {
    constructor() {
        super("Esta build já existe.", "BuildAlreadyExistsError", 409);
    }
}
