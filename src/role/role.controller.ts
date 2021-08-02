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
import { CreateRoleDto, UpdateRoleDto } from "./role.dto";
import { RoleService } from "./role.service";

@Controller("role")
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
        return await this.roleService.create(createRoleDto);
    }

    @Put()
    @UseFilters(BadRequestExceptionFilter)
    async update(@Body() updateRoleDto: UpdateRoleDto) {
        return await this.roleService.update(updateRoleDto);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return await this.roleService.delete(id);
    }
}
