import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";

import { Cliente, Audio } from "./index";
@Entity("servicios")
export class Servicio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.servicio, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "cliente_id" })
    cliente!: Cliente;

    @OneToMany(() => Audio, (audio) => audio.servicio, { cascade: true })
    audio!: Audio[];
}
