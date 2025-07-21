import { Request, Response } from "express";
export declare class RequiredAttributeController {
    createRequiredAttribute(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getRequiredAttributeById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllRequiredAttributes(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateRequiredAttribute(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteRequiredAttribute(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: RequiredAttributeController;
export default _default;
