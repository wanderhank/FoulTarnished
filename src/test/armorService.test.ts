import {ArmorRepository} from "../repository/armorRepository";
import { ArmorService } from "../services/armorService";
import {makeFakeArmor} from "./fakers/armor";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {MissingArmorFieldError} from "../errors/MissingArmorFieldError";
import {ArmorAlreadyExistsError} from "../errors/ArmorAlreadyExistsError";
import {ArmorNotFoundError} from "../errors/ArmorNotFoundError";

jest.mock("../repository/armorRepository", () => {
    return {
        ArmorRepository: jest.fn().mockImplementation(() => ({
            getArmorByName: jest.fn(),
            createArmor: jest.fn(),
            getArmorById: jest.fn(),
            getAllArmors: jest.fn(),
            updateArmor: jest.fn(),
            deleteArmor: jest.fn()
        })),
    };
});

describe("Armor Methods", () => {
    let armorService: ArmorService;
    let mockRepo: jest.Mocked<ArmorRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRepo = new ArmorRepository() as jest.Mocked<ArmorRepository>;
        armorService = new ArmorService(mockRepo);

    });

    it("Deve criar uma armadura corretamente", async () => {
        const mockArmorData = makeFakeArmor();

        mockRepo.getArmorById.mockResolvedValue(mockArmorData)
        const armor = await armorService.getArmorById(mockArmorData.id);
        expect(armor).toEqual(mockArmorData);
        expect(armor).toHaveProperty("name", mockArmorData.name);

    })

    it("Deve lançar um erro ao criar uma armadura com campos vazios", async () => {
        let mockArmorData = makeFakeArmor();
        mockArmorData.description = "";
        await expect(armorService.createArmor(mockArmorData))
            .rejects
            .toThrow(RequiredFieldsAreMissingError);

    })

    it("Deve lançar um erro ao criar armaduras já existentes", async () => {
        const mockArmorData = makeFakeArmor();
        mockRepo.getArmorByName.mockResolvedValue(mockArmorData)
        await expect(armorService.createArmor(mockArmorData))
            .rejects
            .toThrow(ArmorAlreadyExistsError)
    })

    it("Deve retornar um erro ao pesquisar uma armadura com ID inexistente", async () => {
        await expect(armorService.getArmorById("1"))
            .rejects
            .toThrow(ArmorNotFoundError)
    })


    it("Deve retornar uma armadura existente pelo Id", async () => {
        const mockArmorData = makeFakeArmor();
        mockRepo.getArmorById.mockResolvedValue(mockArmorData)
        const armor = await armorService.getArmorById(mockArmorData.id);
        expect(armor).toEqual(mockArmorData)
    })

    it("Deve retornar uma lista vazia quando não há registros", async() => {
        mockRepo.getAllArmors.mockResolvedValue([])
        const armors = await armorService.getAllArmors();
        expect(armors).toEqual([]);
        expect(armors).toHaveLength(0);
    })

    it("Deve retornar uma lista com armaduras", async() => {
        const mockArmorData = makeFakeArmor();
        const mockArmorData2 = makeFakeArmor();
        mockRepo.getAllArmors.mockResolvedValue([mockArmorData, mockArmorData2])
        const armors = await armorService.getAllArmors();
        expect(armors).toContain(mockArmorData)
        expect(armors).toContain(mockArmorData2)
        expect(armors).toHaveLength(2);
    })

    it("Deve atualizar um atributo de uma armadaura a partir do seu id", async() => {
        const mockArmorData = makeFakeArmor();
        const mockArmorData2 = structuredClone(mockArmorData) ;
        mockArmorData2.name = "teste"
        mockRepo.getArmorById.mockResolvedValue(mockArmorData)
        mockRepo.updateArmor.mockResolvedValue(mockArmorData2)
        const armorUpdated = await armorService.updateArmor(mockArmorData.id, {name: "teste"} )
        expect(armorUpdated?.name).toBe("teste")

    })

    it("Deve retornar um erro ao atualizar um atributo de uma armadura a partir de um id inexistente", async () => {
        mockRepo.getArmorById.mockResolvedValue(null);

        await expect(
            armorService.updateArmor("3", { name: "teste" })
        ).rejects.toThrow(ArmorNotFoundError);
        expect(mockRepo.updateArmor).not.toHaveBeenCalled();
    });

    it("Deve excluir uma armadura a partir do seu id", async() => {
        const mockArmorData = makeFakeArmor();

        mockRepo.getArmorById.mockResolvedValue(mockArmorData)
        mockRepo.deleteArmor.mockResolvedValue(true)
        const result = await armorService.deleteArmor(mockArmorData.id);
        expect(result).toBe(true)

    })

    it("Deve lançar um erro ao excluir uma armadura a partir de um id inválido", async() => {

        mockRepo.getArmorById.mockResolvedValue(null);
        await expect( armorService.deleteArmor("300")).rejects.toThrow(ArmorNotFoundError)

    })


})