import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseFilters,
    UseInterceptors,
} from "@nestjs/common";
import { ResponseInterceptor } from "src/common/interceptors";
import { BadRequestExceptionFilter } from "../common/filters/exceptions.filter";
import { CreateUserDto, UpdateUserDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller("users")
@UseInterceptors(ResponseInterceptor)
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
        await this.usersService.create(createUserDto);
    }

    @Put(":login")
    @UseFilters(BadRequestExceptionFilter)
    async update(
        @Param("login") login: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        await this.usersService.update(login, updateUserDto);
    }

    @Delete(":login")
    async delete(@Param("login") login: string) {
        await this.usersService.delete(login);
    }
}
