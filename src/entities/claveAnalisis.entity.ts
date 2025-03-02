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
import { DataAnalisis } from "./index";
@Entity("clave_analisis")
export class ClaveAnalisis {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    clave!: string;

    @Column()
    descripcion!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @OneToMany(() => DataAnalisis, (data) => data.clave, {
        cascade: true,
    })
    data!: DataAnalisis[];
}
