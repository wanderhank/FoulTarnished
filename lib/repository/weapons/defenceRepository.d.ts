import { RequiredAttribute } from "../../models/Weapons/RequiredAttribute";
export declare class RequiredAttributeRepository {
    createRequiredAttribute(weaponId: string, name: string, amount: number): Promise<RequiredAttribute>;
    getRequiredAttributeById(id: number): Promise<RequiredAttribute | null>;
    getAllRequiredAttributes(): Promise<RequiredAttribute[]>;
    updateRequiredAttribute(id: number, data: Partial<{
        name: string;
        amount: number;
    }>): Promise<RequiredAttribute | null>;
    deleteRequiredAttribute(id: number): Promise<boolean>;
}
