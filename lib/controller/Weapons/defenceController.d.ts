import { Request, Response } from "express";
export declare class DefenceController {
    createDefence(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getDefenceById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllDefences(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateDefence(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteDefence(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: DefenceController;
export default _default;
