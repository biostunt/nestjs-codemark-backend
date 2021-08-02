import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, Role } from "../entity";
import { CreateUserDto, UpdateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async find(login) {
        return await this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.roles", "role")
            .where({ login })
            .getOne();
    }

    async create(createUserDto: CreateUserDto) {
        const { name, login, password, roles } = createUserDto;
        const existingRoles = roles
            ? await this.roleRepository.findByIds(roles)
            : [];
        if (await this.userRepository.findOne({ login }))
            throw new BadRequestException(
                `User with login: ${login} already exists!`,
            );
        const user = new User();
        user.name = name;
        user.login = login;
        user.password = password;
        user.roles = existingRoles;
        await this.userRepository.save(user);
        return { success: true };
    }

    async update(login: string, updateUserDto: UpdateUserDto) {
        const { name, password, roles } = updateUserDto;
        const existingRoles = roles
            ? await this.roleRepository.findByIds(roles)
            : [];
        const user = await this.userRepository.findOne({ login });
        if (!user)
            throw new BadRequestException(
                `User with login: ${login} doesn't exist!`,
            );
        user.name = name;
        user.password = password;
        user.roles = existingRoles;
        this.userRepository.save(user);
        return { success: true };
    }

    async delete(login: string) {
        const user = await this.userRepository.findOne({ login });
        if (!user)
            throw new BadRequestException(
                `User with login: ${login} doesn't exist!`,
            );
        await this.userRepository.remove([user]);
        return { success: true };
    }
}
