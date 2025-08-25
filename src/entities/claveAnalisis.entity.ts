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
import { DataAnalisis, Servicio } from "./index";
@Entity("claves_analisis")
export class ClaveAnalisis {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    clave!: string;

    @Column({ type: "text" })
    descripcion!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @OneToMany(() => DataAnalisis, (data) => data.clave, {
        cascade: true,
    })
    data!: DataAnalisis[];

    @ManyToOne(() => Servicio, (servicio) => servicio.claveAnalisis, {
        onDelete: "NO ACTION",
    })
    @JoinColumn({ name: "servicio_id" })
    servicio!: Servicio;
}
