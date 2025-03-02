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
import { Transcripcion, DataAnalisis, Parametro } from "./index";
@Entity("analisis")
export class Analisis {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @ManyToOne(() => Transcripcion, (transcripcion) => transcripcion.analisis, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "transcripcion_id" })
    transcripcion!: Transcripcion;

    @OneToMany(() => DataAnalisis, (data) => data.analisis, {
        onDelete: "CASCADE",
    })
    data!: DataAnalisis[];

    @ManyToOne(() => Parametro, (parametro) => parametro.analisis, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "parametro_id" })
    parametro!: Parametro;
}
