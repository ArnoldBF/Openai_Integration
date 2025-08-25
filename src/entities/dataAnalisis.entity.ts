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
import { Analisis, ClaveAnalisis } from "./index";
@Entity("data_analisis")
export class DataAnalisis {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: "MAX", nullable: true })
    valor!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @ManyToOne(() => Analisis, (analisis) => analisis.data, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "analisis_id" })
    analisis!: Analisis;

    @ManyToOne(() => ClaveAnalisis, (claveAnalisis) => claveAnalisis.data, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "clave_id" })
    clave!: ClaveAnalisis;
}
