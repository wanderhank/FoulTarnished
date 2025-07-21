import { Scaling } from "../../models/Weapons/Scaling";
export declare class ScalingRepository {
    createScaling(weaponId: string, name: string, scaling: string): Promise<Scaling>;
    getScalingById(id: number): Promise<Scaling | null>;
    getAllScalings(): Promise<Scaling[]>;
    updateScaling(id: number, data: Partial<{
        name: string;
        scaling: string;
    }>): Promise<Scaling | null>;
    deleteScaling(id: number): Promise<boolean>;
}
