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
} from "typeorm";
import { Audio, TipoAnalisis } from "./index";
@Entity("transcripciones")
export class Transcripcion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "file_name", unique: true })
    @Index()
    fileName!: string;

    @Column({ nullable: true })
    transcripcion!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @OneToOne(() => Audio, (audio) => audio.transcripcion, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "audio_id" })
    audio!: Audio;
}
