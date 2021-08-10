import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseFilters,
    UseInterceptors,
} from "@nestjs/common";
import { ResponseInterceptor } from "src/common/interceptors";
import { BadRequestExceptionFilter } from "../common/filters/exceptions.filter";
import { CreateRoleDto, UpdateRoleDto } from "./role.dto";
import { RoleService } from "./role.service";

@Controller("role")
@UseInterceptors(ResponseInterceptor)
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    async findAll() {
        return await this.roleService.findAll();
    }

    @Get(":id")
    async find(@Param("id", ParseIntPipe) id: number) {
        return await this.roleService.find(id);
    }

    @Post()
    @UseFilters(BadRequestExceptionFilter)
    async create(@Body() createRoleDto: CreateRoleDto) {
        await this.roleService.create(createRoleDto);
    }

    @Put()
    @UseFilters(BadRequestExceptionFilter)
    async update(@Body() updateRoleDto: UpdateRoleDto) {
        await this.roleService.update(updateRoleDto);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.roleService.delete(id);
    }
}
