declare class RequiredAttributeService {
    createRequiredAttribute(weaponId: string, name: string, amount: number): Promise<import("../../models/Weapons/RequiredAttribute").RequiredAttribute>;
    getRequiredAttributeById(id: number): Promise<import("../../models/Weapons/RequiredAttribute").RequiredAttribute | null>;
    getAllRequiredAttributes(): Promise<import("../../models/Weapons/RequiredAttribute").RequiredAttribute[]>;
    updateRequiredAttribute(id: number, data: Partial<{
        name: string;
        amount: number;
    }>): Promise<import("../../models/Weapons/RequiredAttribute").RequiredAttribute | null>;
    deleteRequiredAttribute(id: number): Promise<boolean>;
}
declare const _default: RequiredAttributeService;
export default _default;
