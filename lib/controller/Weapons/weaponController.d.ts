import { Request, Response } from "express";
export declare class WeaponController {
    createWeapon(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getWeaponById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllWeapons(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateWeapon(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteWeapon(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: WeaponController;
export default _default;
