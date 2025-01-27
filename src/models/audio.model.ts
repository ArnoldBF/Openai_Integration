import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
    OneToOne,
} from "typeorm";
import { DataAudio } from "./dataAudio.model";
import { Transcripcion } from "./transcripcion.model";
@Entity("audios")
export class Audio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "file_name", unique: true })
    @Index()
    fileName!: string;

    @Column()
    @Index()
    servicio!: string;

    @Column({ nullable: true })
    transcrito!: number;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @OneToMany(() => DataAudio, (data) => data.audio, { cascade: true })
    data!: DataAudio[];

    @OneToOne(() => Transcripcion, (transcripcion) => transcripcion.audio, {
        cascade: true,
    })
    transcripcion!: Transcripcion;
}
