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

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find();
    }
    async find(id: number): Promise<Role> {
        return await this.roleRepository.findOne({ id });
    }
    async create(createRoleDto: CreateRoleDto): Promise<void> {
        const { name } = createRoleDto;
        if (await this.roleRepository.findOne({ name }))
            throw new BadRequestException(
                `Role with name ${name} already exists!`,
            );
        const role = new Role();
        role.name = name;
        await this.roleRepository.save(role);
    }
    async update(updateRoleDto: UpdateRoleDto): Promise<void> {
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
    }
    async delete(id: number): Promise<void> {
        const role = await this.roleRepository.findOne({ id });
        if (!role)
            throw new BadRequestException(`Role with id: ${id} doesn't exist!`);
        await this.roleRepository.delete({ id });
    }
}
