import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { DataAudio } from "./index";
@Entity("claves_audios")
export class ClaveAudio {
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

    @OneToMany(() => DataAudio, (data) => data.clave, {
        cascade: true,
    })
    data!: DataAudio[];
}
