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

import {
    Cliente,
    Audio,
    ClaveAnalisis,
    Prompt,
    TipoAnalisis,
    Usuario,
} from "./index";
@Entity("servicios")
export class Servicio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, unique: true })
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

    @OneToMany(() => ClaveAnalisis, (clave) => clave.servicio, {
        cascade: true,
    })
    claveAnalisis!: ClaveAnalisis[];

    @OneToMany(() => Prompt, (prompt) => prompt.servicio)
    prompt!: Prompt[];

    @OneToMany(() => TipoAnalisis, (tipoAnalisis) => tipoAnalisis.servicio)
    tipoAnalisis!: TipoAnalisis[];

    @OneToMany(() => Usuario, (usuario) => usuario.servicio, { cascade: true })
    usuario!: Usuario[];
}
