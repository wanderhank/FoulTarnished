import { BaseError } from "./BaseError";

export class BuildNotFoundError extends BaseError {
    constructor() {
        super("Build não encontrada.", "BuildNotFoundError", 404);
    }
}