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

import { Parametro } from "./index";

@Entity("tipo_analisis")
export class TipoAnalisis {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: "varchar" })
    description!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @OneToMany(() => Parametro, (parametros) => parametros.tipo, {
        onDelete: "CASCADE",
    })
    parametro!: Parametro[];
}
