import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseFilters,
} from "@nestjs/common";
import { BadRequestExceptionFilter } from "../common/filters/exceptions.filter";
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(":login")
    async find(@Param("login") login: string) {
        return await this.usersService.find(login);
    }

    @Post()
    @UseFilters(BadRequestExceptionFilter)
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Put(":login")
    @UseFilters(BadRequestExceptionFilter)
    async update(
        @Param("login") login: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.usersService.update(login, updateUserDto);
    }

    @Delete(":login")
    async delete(@Param("login") login: string) {
        return await this.usersService.delete(login);
    }
}
