import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Role } from "../entity";
import { RoleService } from "./role.service";

describe("RoleService", () => {
    let service: RoleService;

    const mockRoleRepository = {
        findOne: jest.fn().mockImplementation(({ id, name }) => {
            if (id) {
                return id === 1 ? { id, name: "test" } : undefined;
            }
            if (name) {
                return name === "test" ? { id: 1, name } : undefined;
            }
        }),
        save: jest.fn().mockImplementation((role) => role),
        delete: jest.fn().mockImplementation(({ id }) => id),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleService,
                {
                    provide: getRepositoryToken(Role),
                    useValue: mockRoleRepository,
                },
            ],
        }).compile();

        service = module.get<RoleService>(RoleService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create role", async () => {
        const dto = { name: "name" };
        expect(await service.create(dto)).toEqual({ success: true });
        expect(mockRoleRepository.findOne).toHaveBeenCalledWith({
            name: dto.name,
        });
        expect(mockRoleRepository.save).toHaveBeenCalledWith(dto);
    });
    it("should throw error while create role", async () => {
        const dto = { name: "test" };
        try {
            await service.create(dto);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
        expect(mockRoleRepository.findOne).toHaveBeenCalledWith({
            name: dto.name,
        });
    });

    it("should update role", async () => {
        const dto = { id: 1, name: "name" };
        expect(await service.update(dto)).toEqual({ success: true });
        expect(mockRoleRepository.findOne).toHaveBeenCalledWith({ id: dto.id });
        expect(mockRoleRepository.findOne).toHaveBeenCalledWith({
            name: dto.name,
        });
        expect(mockRoleRepository.save).toHaveBeenCalledWith(dto);
    });
    it("should throw error while update role (no such entity with same id)", async () => {
        const dto = { id: 2, name: "name" };
        try {
            await service.update(dto);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
        expect(mockRoleRepository.findOne).toHaveBeenCalledWith({ id: dto.id });
    });

    it("should throw error while update role (entity with same name already exists)", async () => {
        const dto = { id: 1, name: "test" };
        try {
            await service.update(dto);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
        expect(mockRoleRepository.findOne).toHaveBeenCalledWith({ id: dto.id });
        expect(mockRoleRepository.findOne).toHaveBeenCalledWith({
            name: dto.name,
        });
    });

    it("should delete role", async () => {
        const id = 1;
        expect(await service.delete(id)).toEqual({ success: true });
        expect(mockRoleRepository.findOne).toHaveBeenCalledWith({ id });
        expect(mockRoleRepository.delete).toHaveBeenCalledWith({ id });
    });
    it("should throw error while delete role", async () => {
        const id = 2;
        try {
            await service.delete(id);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
        expect(mockRoleRepository.findOne).toHaveBeenCalledWith({ id });
    });
});
