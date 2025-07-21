import { Request, Response } from "express";
export declare class ScalingController {
    createScaling(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getScalingById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllScalings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateScaling(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteScaling(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: ScalingController;
export default _default;
