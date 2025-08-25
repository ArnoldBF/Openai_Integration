import { string } from "joi";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Usuario } from "./index";

@Entity("empleados")
export class Empleado {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 200 })
    last_name!: string;

    @Column({ type: "varchar", length: 15 })
    ci!: string;

    @Column({ type: "varchar", length: 150 })
    email!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @OneToOne(() => Usuario, (usuario) => usuario.empleado)
    usuario!: Usuario;
}
