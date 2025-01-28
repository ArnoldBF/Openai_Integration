import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { DataAudio, Transcripcion, Servicio } from "./index";
@Entity("audios")
export class Audio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "file_name", unique: true })
    @Index()
    fileName!: string;

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

    @ManyToOne(() => Servicio, (servicio) => servicio.audio, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "servicio_id" })
    servicio!: Servicio;
}
