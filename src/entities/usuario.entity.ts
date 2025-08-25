import { string } from "joi";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Empleado } from "./empleado.entity";
import { Servicio } from "./servicio.entity";

@Entity("usuarios")
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "user_name", type: "varchar", length: 100 })
    userName!: string;

    @Column({ type: "varchar", length: 100 })
    password!: string;

    @Column({ nullable: true })
    recovery_token!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @OneToOne(() => Empleado, (empleado) => empleado.usuario)
    @JoinColumn({ name: "empleado_id" })
    empleado!: Empleado;

    @ManyToOne(() => Servicio, (servicio) => servicio.usuario, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "servicio_id" })
    servicio!: Servicio;
}
