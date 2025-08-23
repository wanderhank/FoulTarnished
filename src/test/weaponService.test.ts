import {makeFakeWeapon} from "./fakers/weapon";
import {WeaponAlreadyExistsError} from "../errors/WeaponAlreadyExistsError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {WeaponNotFoundError} from "../errors/WeaponNotFoundError";
import { WeaponRepository } from "../repository/weaponRepository";
import {WeaponService} from "../services/weaponService";


jest.mock("../repository/weaponRepository", () => {
    return {
        WeaponRepository: jest.fn().mockImplementation(() => ({
            getWeaponByName: jest.fn(),
            createWeapon: jest.fn(),
            getWeaponById: jest.fn(),
            getAllWeapons: jest.fn(),
            updateWeapon: jest.fn(),
            deleteWeapon: jest.fn()
        })),
    };
});

describe("Weapon Methods", () => {
    let armorService: WeaponService;
    let mockRepo: jest.Mocked<WeaponRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRepo = new WeaponRepository() as jest.Mocked<WeaponRepository>;
        armorService = new WeaponService(mockRepo);

    });

    it("Deve criar uma armadura corretamente", async () => {
        const mockWeaponData = makeFakeWeapon();

        mockRepo.getWeaponById.mockResolvedValue(mockWeaponData)
        const armor = await armorService.getWeaponById(mockWeaponData.id);
        expect(armor).toEqual(mockWeaponData);
        expect(armor).toHaveProperty("name", mockWeaponData.name);

    })

    it("Deve lançar um erro ao criar uma armadura com campos vazios", async () => {
        let mockWeaponData = makeFakeWeapon();
        mockWeaponData.description = "";
        await expect(armorService.createWeapon(mockWeaponData))
            .rejects
            .toThrow(RequiredFieldsAreMissingError);

    })

    it("Deve lançar um erro ao criar armaduras já existentes", async () => {
        const mockWeaponData = makeFakeWeapon();
        mockRepo.getWeaponByName.mockResolvedValue(mockWeaponData)
        await expect(armorService.createWeapon(mockWeaponData))
            .rejects
            .toThrow(WeaponAlreadyExistsError)
    })

    it("Deve retornar um erro ao pesquisar uma armadura com ID inexistente", async () => {
        await expect(armorService.getWeaponById("1"))
            .rejects
            .toThrow(WeaponNotFoundError)
    })


    it("Deve retornar uma armadura existente pelo Id", async () => {
        const mockWeaponData = makeFakeWeapon();
        mockRepo.getWeaponById.mockResolvedValue(mockWeaponData)
        const armor = await armorService.getWeaponById(mockWeaponData.id);
        expect(armor).toEqual(mockWeaponData)
    })

    it("Deve retornar uma lista vazia quando não há registros", async() => {
        mockRepo.getAllWeapons.mockResolvedValue([])
        const armors = await armorService.getAllWeapons();
        expect(armors).toEqual([]);
        expect(armors).toHaveLength(0);
    })

    it("Deve retornar uma lista com armaduras", async() => {
        const mockWeaponData = makeFakeWeapon();
        const mockWeaponData2 = makeFakeWeapon();
        mockRepo.getAllWeapons.mockResolvedValue([mockWeaponData, mockWeaponData2])
        const armors = await armorService.getAllWeapons();
        expect(armors).toContain(mockWeaponData)
        expect(armors).toContain(mockWeaponData2)
        expect(armors).toHaveLength(2);
    })

    it("Deve atualizar um atributo de uma arma a partir do seu id", async() => {
        const mockWeaponData = makeFakeWeapon();
        const mockWeaponData2 = structuredClone(mockWeaponData) ;
        mockWeaponData2.name = "teste"
        mockRepo.getWeaponById.mockResolvedValue(mockWeaponData)
        mockRepo.updateWeapon.mockResolvedValue(mockWeaponData2)
        const armorUpdated = await armorService.updateWeapon(mockWeaponData.id, {name: "teste"} )
        expect(armorUpdated?.name).toBe("teste")

    })

    it("Deve retornar um erro ao atualizar um atributo de uma armadura a partir de um id inexistente", async () => {
        mockRepo.getWeaponById.mockResolvedValue(null);

        await expect(
            armorService.updateWeapon("3", { name: "teste" })
        ).rejects.toThrow(WeaponNotFoundError);
        expect(mockRepo.updateWeapon).not.toHaveBeenCalled();
    });

    it("Deve excluir uma armadura a partir do seu id", async() => {
        const mockWeaponData = makeFakeWeapon();

        mockRepo.getWeaponById.mockResolvedValue(mockWeaponData)
        mockRepo.deleteWeapon.mockResolvedValue(true)
        const result = await armorService.deleteWeapon(mockWeaponData.id);
        expect(result).toBe(true)

    })

    it("Deve lançar um erro ao excluir uma armadura a partir de um id inválido", async() => {

        mockRepo.getWeaponById.mockResolvedValue(null);
        await expect( armorService.deleteWeapon("300")).rejects.toThrow(WeaponNotFoundError)

    })


})