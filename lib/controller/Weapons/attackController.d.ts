import { Request, Response } from "express";
export declare class AttackController {
    createAttack(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAttackById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllAttacks(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateAttack(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteAttack(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: AttackController;
export default _default;
