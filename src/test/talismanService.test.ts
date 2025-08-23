import {TalismanNotFoundError} from "../errors/TalismanNotFoundError";
import {makeFakeTalisman} from "./fakers/talisman";
import {TalismanAlreadyExistsError} from "../errors/TalismanAlreadyExistsError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import { TalismanService} from "../services/talismanService";
import {TalismanRepository} from "../repository/talismanRepository";


jest.mock("../repository/talismanRepository", () => {
    return {
        TalismanRepository: jest.fn().mockImplementation(() => ({
            getTalismanByName: jest.fn(),
            createTalisman: jest.fn(),
            getTalismanById: jest.fn(),
            getAllTalismans: jest.fn(),
            updateTalisman: jest.fn(),
            deleteTalisman: jest.fn()
        })),
    };
});

describe("Talisman Methods", () => {
    let armorService: TalismanService;
    let mockRepo: jest.Mocked<TalismanRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRepo = new TalismanRepository() as jest.Mocked<TalismanRepository>;
        armorService = new TalismanService(mockRepo);

    });

    it("Deve criar uma talismã corretamente", async () => {
        const mockTalismanData = makeFakeTalisman();

        mockRepo.getTalismanById.mockResolvedValue(mockTalismanData)
        const armor = await armorService.getTalismanById(mockTalismanData.id);
        expect(armor).toEqual(mockTalismanData);
        expect(armor).toHaveProperty("name", mockTalismanData.name);

    })

    it("Deve lançar um erro ao criar uma talismã com campos vazios", async () => {
        let mockTalismanData = makeFakeTalisman();
        mockTalismanData.description = "";
        await expect(armorService.createTalisman(mockTalismanData))
            .rejects
            .toThrow(RequiredFieldsAreMissingError);

    })

    it("Deve lançar um erro ao criar talismãs já existentes", async () => {
        const mockTalismanData = makeFakeTalisman();
        mockRepo.getTalismanByName.mockResolvedValue(mockTalismanData)
        await expect(armorService.createTalisman(mockTalismanData))
            .rejects
            .toThrow(TalismanAlreadyExistsError)
    })

    it("Deve retornar um erro ao pesquisar uma talismã com ID inexistente", async () => {
        await expect(armorService.getTalismanById("1"))
            .rejects
            .toThrow(TalismanNotFoundError)
    })


    it("Deve retornar uma talismã existente pelo Id", async () => {
        const mockTalismanData = makeFakeTalisman();
        mockRepo.getTalismanById.mockResolvedValue(mockTalismanData)
        const armor = await armorService.getTalismanById(mockTalismanData.id);
        expect(armor).toEqual(mockTalismanData)
    })

    it("Deve retornar uma lista vazia quando não há registros", async() => {
        mockRepo.getAllTalismans.mockResolvedValue([])
        const armors = await armorService.getAllTalismans();
        expect(armors).toEqual([]);
        expect(armors).toHaveLength(0);
    })

    it("Deve retornar uma lista com talismãs", async() => {
        const mockTalismanData = makeFakeTalisman();
        const mockTalismanData2 = makeFakeTalisman();
        mockRepo.getAllTalismans.mockResolvedValue([mockTalismanData, mockTalismanData2])
        const armors = await armorService.getAllTalismans();
        expect(armors).toContain(mockTalismanData)
        expect(armors).toContain(mockTalismanData2)
        expect(armors).toHaveLength(2);
    })

    it("Deve atualizar um atributo de uma armadaura a partir do seu id", async() => {
        const mockTalismanData = makeFakeTalisman();
        const mockTalismanData2 = structuredClone(mockTalismanData) ;
        mockTalismanData2.name = "teste"
        mockRepo.getTalismanById.mockResolvedValue(mockTalismanData)
        mockRepo.updateTalisman.mockResolvedValue(mockTalismanData2)
        const armorUpdated = await armorService.updateTalisman(mockTalismanData.id, {name: "teste"} )
        expect(armorUpdated?.name).toBe("teste")

    })

    it("Deve retornar um erro ao atualizar um atributo de uma talismã a partir de um id inexistente", async () => {
        mockRepo.getTalismanById.mockResolvedValue(null);

        await expect(
            armorService.updateTalisman("3", { name: "teste" })
        ).rejects.toThrow(TalismanNotFoundError);
        expect(mockRepo.updateTalisman).not.toHaveBeenCalled();
    });

    it("Deve excluir uma talismã a partir do seu id", async() => {
        const mockTalismanData = makeFakeTalisman();

        mockRepo.getTalismanById.mockResolvedValue(mockTalismanData)
        mockRepo.deleteTalisman.mockResolvedValue(true)
        const result = await armorService.deleteTalisman(mockTalismanData.id);
        expect(result).toBe(true)

    })

    it("Deve lançar um erro ao excluir uma talismã a partir de um id inválido", async() => {

        mockRepo.getTalismanById.mockResolvedValue(null);
        await expect( armorService.deleteTalisman("300")).rejects.toThrow(TalismanNotFoundError)

    })


})