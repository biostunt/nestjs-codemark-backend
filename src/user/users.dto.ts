import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Matches,
} from "class-validator";

export class DeleteUserDto {
    @IsNotEmpty()
    login: string;
}

export class CreateUserDto {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public login: string;

    @IsNotEmpty()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, {
        message:
            "Password must contains at least 1 Upper case letter and at least 1 digit",
    })
    public password: string;

    @IsOptional()
    @IsArray()
    public roles: number[];
}

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    @IsNotEmpty()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, {
        message:
            "Password must contains at least 1 Upper case letter and at least 1 digit",
    })
    public password: string;

    @IsOptional()
    @IsArray()
    public roles: number[];
}
