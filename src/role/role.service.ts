import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../entity";
import { Repository } from "typeorm";
import { CreateRoleDto, UpdateRoleDto } from "./role.dto";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    async findAll() {
        return await this.roleRepository.find();
    }
    async find(id: number) {
        return await this.roleRepository.findOne({ id });
    }
    async create(createRoleDto: CreateRoleDto) {
        const { name } = createRoleDto;
        if (await this.roleRepository.findOne({ name }))
            throw new BadRequestException(
                `Role with name ${name} already exists!`,
            );
        const role = new Role();
        role.name = name;
        await this.roleRepository.save(role);
        return { success: true };
    }
    async update(updateRoleDto: UpdateRoleDto) {
        const { id, name } = updateRoleDto;
        const role = await this.roleRepository.findOne({ id });
        const roleWithSameName = await this.roleRepository.findOne({ name });
        if (!role)
            throw new BadRequestException(`Role with id: ${id} doesn't exist!`);
        if (roleWithSameName)
            throw new BadRequestException(
                `Role with name: ${name} already exists!`,
            );
        role.name = name;
        await this.roleRepository.save(role);
        return { success: true };
    }
    async delete(id: number) {
        const role = await this.roleRepository.findOne({ id });
        if (!role)
            throw new BadRequestException(`Role with id: ${id} doesn't exist!`);
        await this.roleRepository.delete({ id });
        return { success: true };
    }
}
