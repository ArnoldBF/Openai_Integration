import { on } from "events";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Parametro, Servicio } from "./index";
@Entity("prompts")
export class Prompt {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, type: "varchar", length: 255 })
    name!: string;

    @Column({ nullable: true, type: "text" })
    template!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @OneToMany(() => Parametro, (parametros) => parametros.prompt, {
        onDelete: "CASCADE",
    })
    parametros!: Parametro[];

    @ManyToOne(() => Servicio, (servicio) => servicio.prompt, {
        onDelete: "NO ACTION",
    })
    @JoinColumn({ name: "servicio_id" })
    servicio!: Servicio;
}
