import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { Transcripcion } from "./index";

@Entity("tipo_analisis")
export class TipoAnalisis {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    // @ManyToOne(
    //     () => Transcripcion,
    //     (transcripcion) => transcripcion.tipo_analisis,
    //     {
    //         onDelete: "CASCADE",
    //     }
    // )
    // @JoinColumn({ name: "id_transcripcion" })
    // transcripcion!: Transcripcion;
}
