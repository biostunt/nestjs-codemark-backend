import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getConnectionOptions } from "typeorm";
import { UsersModule } from "./users";
import { RoleModule } from "./role";
import { Role, User } from "./entity";

@Module({
    imports: [
        // Database
        // https://docs.nestjs.com/techniques/database
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    entities: [Role, User],
                    autoLoadEntities: true,
                    synchronize: process.env.NODE_ENV !== "production",
                }),
        }),

        //Service Modules
        UsersModule,
        RoleModule,
    ],
})
export class AppModule {}
