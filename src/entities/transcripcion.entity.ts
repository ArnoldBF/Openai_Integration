import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToOne,
    OneToMany,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Audio, Analisis } from "./index";
@Entity("transcripciones")
export class Transcripcion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "file_name", type: "varchar", length: 255, unique: true })
    @Index()
    fileName!: string;
    @Column({ nullable: true })
    transcripcion!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @OneToOne(() => Audio, (audio) => audio.transcripcion, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "audio_id" })
    audio!: Audio;

    @OneToMany(() => Analisis, (analisis) => analisis.transcripcion, {
        onDelete: "CASCADE",
    })
    analisis!: Analisis[];
}
