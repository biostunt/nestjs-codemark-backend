import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    name: string;
}

export class UpdateRoleDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    name: string;
}
