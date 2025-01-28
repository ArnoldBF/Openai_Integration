import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { Audio, ClaveAudio } from "./index";

@Entity("data_audios")
export class DataAudio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    valor!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @ManyToOne(() => Audio, (audio) => audio.data, { onDelete: "CASCADE" })
    @JoinColumn({ name: "audio_id" })
    audio!: Audio;

    @ManyToOne(() => ClaveAudio, (clave) => clave.data, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "clave_id" })
    clave!: ClaveAudio;
}
