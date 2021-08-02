import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "../entity/user.entity";
import { Role } from "../entity/role.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Role]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
