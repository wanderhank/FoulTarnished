declare class ScalingService {
    createScaling(weaponId: string, name: string, scaling: string): Promise<import("../../models/Weapons/Scaling").Scaling>;
    getScalingById(id: number): Promise<import("../../models/Weapons/Scaling").Scaling | null>;
    getAllScalings(): Promise<import("../../models/Weapons/Scaling").Scaling[]>;
    updateScaling(id: number, data: Partial<{
        name: string;
        scaling: string;
    }>): Promise<import("../../models/Weapons/Scaling").Scaling | null>;
    deleteScaling(id: number): Promise<boolean>;
}
declare const _default: ScalingService;
export default _default;
