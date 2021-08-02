import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
    @Column()
    name: string;

    @PrimaryColumn()
    login: string;

    @Column()
    password: string;

    @ManyToMany(() => Role, (role) => role.id, { cascade: true })
    @JoinTable({})
    roles: Role[];
}
