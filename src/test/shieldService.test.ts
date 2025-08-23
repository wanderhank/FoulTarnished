import {makeFakeShield} from "./fakers/shield";
import {ShieldNotFoundError} from "../errors/ShieldNotFoundError";
import {ShieldAlreadyExistsError} from "../errors/ShieldAlreadyExistsError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {ShieldRepository} from "../repository/shieldRepository";
import { ShieldService} from "../services/shieldService";


jest.mock("../repository/shieldRepository", () => {
    return {
        ShieldRepository: jest.fn().mockImplementation(() => ({
            getShieldByName: jest.fn(),
            createShield: jest.fn(),
            getShieldById: jest.fn(),
            getAllShields: jest.fn(),
            updateShield: jest.fn(),
            deleteShield: jest.fn()
        })),
    };
});

describe("Shield Methods", () => {
    let armorService: ShieldService;
    let mockRepo: jest.Mocked<ShieldRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRepo = new ShieldRepository() as jest.Mocked<ShieldRepository>;
        armorService = new ShieldService(mockRepo);

    });

    it("Deve criar uma armadura corretamente", async () => {
        const mockShieldData = makeFakeShield();

        mockRepo.getShieldById.mockResolvedValue(mockShieldData)
        const armor = await armorService.getShieldById(mockShieldData.id);
        expect(armor).toEqual(mockShieldData);
        expect(armor).toHaveProperty("name", mockShieldData.name);

    })

    it("Deve lançar um erro ao criar uma armadura com campos vazios", async () => {
        let mockShieldData = makeFakeShield();
        mockShieldData.description = "";
        await expect(armorService.createShield(mockShieldData))
            .rejects
            .toThrow(RequiredFieldsAreMissingError);

    })

    it("Deve lançar um erro ao criar armaduras já existentes", async () => {
        const mockShieldData = makeFakeShield();
        mockRepo.getShieldByName.mockResolvedValue(mockShieldData)
        await expect(armorService.createShield(mockShieldData))
            .rejects
            .toThrow(ShieldAlreadyExistsError)
    })

    it("Deve retornar um erro ao pesquisar uma armadura com ID inexistente", async () => {
        await expect(armorService.getShieldById("1"))
            .rejects
            .toThrow(ShieldNotFoundError)
    })


    it("Deve retornar uma armadura existente pelo Id", async () => {
        const mockShieldData = makeFakeShield();
        mockRepo.getShieldById.mockResolvedValue(mockShieldData)
        const armor = await armorService.getShieldById(mockShieldData.id);
        expect(armor).toEqual(mockShieldData)
    })

    it("Deve retornar uma lista vazia quando não há registros", async() => {
        mockRepo.getAllShields.mockResolvedValue([])
        const armors = await armorService.getAllShields();
        expect(armors).toEqual([]);
        expect(armors).toHaveLength(0);
    })

    it("Deve retornar uma lista com armaduras", async() => {
        const mockShieldData = makeFakeShield();
        const mockShieldData2 = makeFakeShield();
        mockRepo.getAllShields.mockResolvedValue([mockShieldData, mockShieldData2])
        const armors = await armorService.getAllShields();
        expect(armors).toContain(mockShieldData)
        expect(armors).toContain(mockShieldData2)
        expect(armors).toHaveLength(2);
    })

    it("Deve atualizar um atributo de uma armadaura a partir do seu id", async() => {
        const mockShieldData = makeFakeShield();
        const mockShieldData2 = structuredClone(mockShieldData) ;
        mockShieldData2.name = "teste"
        mockRepo.getShieldById.mockResolvedValue(mockShieldData)
        mockRepo.updateShield.mockResolvedValue(mockShieldData2)
        const armorUpdated = await armorService.updateShield(mockShieldData.id, {name: "teste"} )
        expect(armorUpdated?.name).toBe("teste")

    })

    it("Deve retornar um erro ao atualizar um atributo de uma armadura a partir de um id inexistente", async () => {
        mockRepo.getShieldById.mockResolvedValue(null);

        await expect(
            armorService.updateShield("3", { name: "teste" })
        ).rejects.toThrow(ShieldNotFoundError);
        expect(mockRepo.updateShield).not.toHaveBeenCalled();
    });

    it("Deve excluir uma armadura a partir do seu id", async() => {
        const mockShieldData = makeFakeShield();

        mockRepo.getShieldById.mockResolvedValue(mockShieldData)
        mockRepo.deleteShield.mockResolvedValue(true)
        const result = await armorService.deleteShield(mockShieldData.id);
        expect(result).toBe(true)

    })

    it("Deve lançar um erro ao excluir uma armadura a partir de um id inválido", async() => {

        mockRepo.getShieldById.mockResolvedValue(null);
        await expect( armorService.deleteShield("300")).rejects.toThrow(ShieldNotFoundError)

    })


})