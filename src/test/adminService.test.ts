import {AdminService} from "../services/adminService";
import {AdminRepository} from "../repository/adminRepository";
import {makeFakeAdmin} from "./fakers/admin";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {AdminNotFoundError} from "../errors/AdminNotFoundError";
import {AdminAlreadyExistsError} from "../errors/AdminAlreadyExistsError";
import {EmailAlreadyInUseError} from "../errors/ EmailAlreadyInUseError";


jest.mock("../repository/adminRepository", () => {
    return {
        AdminRepository: jest.fn().mockImplementation(() => ({
            getAdminByName: jest.fn(),
            createAdminCrypt: jest.fn(),
            getAdminById: jest.fn(),
            getAllAdmins: jest.fn(),
            updateAdmin: jest.fn(),
            deleteAdmin: jest.fn(),
            getAdminByEmail: jest.fn()
        })),
    };
});

describe("Admin Methods", () => {
    let armorService: AdminService;
    let mockRepo: jest.Mocked<AdminRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRepo = new AdminRepository() as jest.Mocked<AdminRepository>;
        armorService = new AdminService(mockRepo);

    });

    it("Deve criar um administrador corretamente", async () => {
        const mockAdminData = makeFakeAdmin();

        mockRepo.getAdminById.mockResolvedValue(mockAdminData)
        const armor = await armorService.getAdminById(mockAdminData.id);
        expect(armor).toEqual(mockAdminData);
        expect(armor).toHaveProperty("name", mockAdminData.name);

    })

    it("Deve lançar um erro ao criar um administrador com campos vazios", async () => {
        let mockAdminData = makeFakeAdmin();
        mockAdminData.email = "";
        await expect(armorService.createAdminCrypt(mockAdminData))
            .rejects
            .toThrow(RequiredFieldsAreMissingError);

    })

    it("Deve lançar um erro ao criar administradores já existentes", async () => {
        const mockAdminData = makeFakeAdmin();
        mockRepo.getAdminByEmail.mockResolvedValue(mockAdminData)
        await expect(armorService.createAdminCrypt(mockAdminData))
            .rejects
            .toThrow(EmailAlreadyInUseError)
    })

    it("Deve retornar um erro ao pesquisar um administrador com ID inexistente", async () => {
        await expect(armorService.getAdminById("1"))
            .rejects
            .toThrow(AdminNotFoundError)
    })


    it("Deve retornar um administrador existente pelo Id", async () => {
        const mockAdminData = makeFakeAdmin();
        mockRepo.getAdminById.mockResolvedValue(mockAdminData)
        const armor = await armorService.getAdminById(mockAdminData.id);
        expect(armor).toEqual(mockAdminData)
    })

    it("Deve retornar uma lista vazia quando não há registros", async() => {
        mockRepo.getAllAdmins.mockResolvedValue([])
        const armors = await armorService.getAllAdmins();
        expect(armors).toEqual([]);
        expect(armors).toHaveLength(0);
    })

    it("Deve retornar uma lista com talismãs", async() => {
        const mockAdminData = makeFakeAdmin();
        const mockAdminData2 = makeFakeAdmin();
        mockRepo.getAllAdmins.mockResolvedValue([mockAdminData, mockAdminData2])
        const armors = await armorService.getAllAdmins();
        expect(armors).toContain(mockAdminData)
        expect(armors).toContain(mockAdminData2)
        expect(armors).toHaveLength(2);
    })

    it("Deve atualizar um atributo de uma armadaura a partir do seu id", async() => {
        const mockAdminData = makeFakeAdmin();
        const mockAdminData2 = structuredClone(mockAdminData) ;
        mockAdminData2.name = "teste"
        mockRepo.getAdminById.mockResolvedValue(mockAdminData)
        mockRepo.updateAdmin.mockResolvedValue(mockAdminData2)
        const armorUpdated = await armorService.updateAdmin(mockAdminData.id, {name: "teste"} )
        expect(armorUpdated?.name).toBe("teste")

    })

    it("Deve retornar um erro ao atualizar um atributo de um administrador a partir de um id inexistente", async () => {
        mockRepo.getAdminById.mockResolvedValue(null);

        await expect(
            armorService.updateAdmin("3", { name: "teste" })
        ).rejects.toThrow(AdminNotFoundError);
        expect(mockRepo.updateAdmin).not.toHaveBeenCalled();
    });

    it("Deve excluir um administrador a partir do seu id", async() => {
        const mockAdminData = makeFakeAdmin();

        mockRepo.getAdminById.mockResolvedValue(mockAdminData)
        mockRepo.deleteAdmin.mockResolvedValue(true)
        const result = await armorService.deleteAdmin(mockAdminData.id);
        expect(result).toBe(true)

    })

    it("Deve lançar um erro ao excluir um administrador a partir de um id inválido", async() => {

        mockRepo.getAdminById.mockResolvedValue(null);
        await expect( armorService.deleteAdmin("300")).rejects.toThrow(AdminNotFoundError)

    })


})