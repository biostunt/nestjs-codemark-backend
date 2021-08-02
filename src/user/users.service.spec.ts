import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Role, User } from "../entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
    let service: UsersService;

    const mockUserRepository = {
        find: jest.fn().mockImplementation(() => []),
        findOne: jest.fn().mockImplementation(({ login }) => {
            if (login === "test") {
                return { name: "name", login, password: "password", roles: [] };
            } else return undefined;
        }),
        save: jest.fn().mockImplementation((dto) => dto),
        remove: jest.fn().mockImplementation((arr) => true),
    };
    const mockRoleRepository = {
        findByIds: jest
            .fn()
            .mockImplementation((arr) =>
                arr.map((id) => ({ id, name: "test" })),
            ),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
                {
                    provide: getRepositoryToken(Role),
                    useValue: mockRoleRepository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should throw error while create user", async () => {
        const dto = {
            name: "name",
            login: "test",
            password: "password",
            roles: [],
        };
        try {
            await service.create(dto);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({
            login: dto.login,
        });
    });

    it("should create a new user without roles", async () => {
        const dto = {
            name: "name",
            login: "login",
            password: "password",
            roles: [],
        };
        expect(await service.create(dto)).toEqual({ success: true });
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({
            login: dto.login,
        });
        expect(mockRoleRepository.findByIds).toHaveBeenCalledWith([]);
        expect(mockUserRepository.save).toHaveBeenCalledWith(dto);
    });

    it("should create a new user with roles", async () => {
        const dto = {
            name: "name",
            login: "login",
            password: "password",
            roles: [1, 2],
        };
        expect(await service.create(dto)).toEqual({ success: true });
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({
            login: dto.login,
        });
        expect(mockRoleRepository.findByIds).toHaveBeenCalledWith(dto.roles);
        expect(mockUserRepository.save).toHaveBeenCalledWith({
            ...dto,
            roles: mockRoleRepository.findByIds(dto.roles),
        });
    });

    it("should throw error while update user", async () => {
        const login = "login";
        const dto = { name: "name", login, password: "password", roles: [] };

        try {
            await service.update(login, dto);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({ login });
    });

    it("should update user without roles", async () => {
        const login = "test";
        const dto = { name: "name", login, password: "password", roles: [] };
        expect(await service.update(login, dto)).toEqual({ success: true });
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({ login });
        expect(mockRoleRepository.findByIds).toHaveBeenCalledWith([]);
        expect(mockUserRepository.save).toHaveBeenCalledWith(dto);
    });

    it("should update user with roles", async () => {
        const login = "test";
        const dto = {
            name: "name",
            login,
            password: "password",
            roles: [1, 2],
        };
        expect(await service.update(login, dto)).toEqual({ success: true });
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({ login });
        expect(mockRoleRepository.findByIds).toHaveBeenCalledWith(dto.roles);
        expect(mockUserRepository.save).toHaveBeenCalledWith({
            ...dto,
            roles: mockRoleRepository.findByIds(dto.roles),
        });
    });

    it("should throw error while delete user", async () => {
        const login = "login";
        try {
            await service.delete(login);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({ login });
    });

    it("should delete user", async () => {
        expect(await service.delete("test")).toEqual({ success: true });
    });
});
