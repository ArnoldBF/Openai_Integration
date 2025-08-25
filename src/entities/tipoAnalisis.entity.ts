import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";

import { Parametro, Servicio } from "./index";

@Entity("tipo_analisis")
export class TipoAnalisis {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "text", nullable: true })
    description!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @OneToMany(() => Parametro, (parametros) => parametros.tipo, {
        onDelete: "CASCADE",
    })
    parametro!: Parametro[];

    @ManyToOne(() => Servicio, (servicio) => servicio.tipoAnalisis, {
        onDelete: "NO ACTION",
    })
    @JoinColumn({ name: "servicio_id" })
    servicio!: Servicio;
}
