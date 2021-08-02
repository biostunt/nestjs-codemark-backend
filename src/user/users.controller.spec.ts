import { Test, TestingModule } from "@nestjs/testing";
import { UsersController, UsersService } from ".";

describe("UsersController", () => {
    let controller: UsersController;

    const mockUsersService = {
        create: jest.fn((dto) => ({ success: true })),
        update: jest.fn((login, dto) => ({ success: true })),
        delete: jest.fn((dto) => ({ success: true })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        })
            .overrideProvider(UsersService)
            .useValue(mockUsersService)
            .compile();
        controller = module.get<UsersController>(UsersController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should create a user", async () => {
        const dto = {
            name: "name",
            login: "login",
            password: "password",
            roles: [],
        };
        expect(await controller.create(dto)).toEqual({ success: true });
        expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });

    it("should update user", async () => {
        const login = "login";
        const dto = { name: "name", password: "password", roles: [] };
        expect(await controller.update(login, dto)).toEqual({ success: true });
        expect(mockUsersService.update).toHaveBeenCalledWith(login, dto);
    });

    it("should delete user", async () => {
        const login = "login";
        expect(await controller.delete(login)).toEqual({ success: true });
        expect(mockUsersService.delete).toHaveBeenCalledWith(login);
    });
});
