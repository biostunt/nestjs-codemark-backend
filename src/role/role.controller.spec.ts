import { Test, TestingModule } from "@nestjs/testing";
import { RoleController, RoleService } from ".";

describe("RoleController", () => {
    let controller: RoleController;

    const mockRoleService = {
        create: jest.fn((dto) => ({ success: true })),
        update: jest.fn((dto) => ({ success: true })),
        delete: jest.fn((id) => ({ success: true })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoleController],
            providers: [RoleService],
        })
            .overrideProvider(RoleService)
            .useValue(mockRoleService)
            .compile();
        controller = module.get<RoleController>(RoleController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should be create user", async () => {
        const dto = { name: "name" };
        expect(await controller.create(dto)).toEqual({ success: true });
        expect(mockRoleService.create).toHaveBeenCalledWith(dto);
    });

    it("should update user", async () => {
        const dto = { id: 1, name: "name" };
        expect(await controller.update(dto)).toEqual({ success: true });
        expect(mockRoleService.update).toHaveBeenCalledWith(dto);
    });

    it("should delete user", async () => {
        const id = 1;
        expect(await controller.delete(id));
        expect(mockRoleService.delete).toHaveBeenCalledWith(id);
    });
});
