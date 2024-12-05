import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from "typeorm";

@Entity("audios")
export class Audio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    id_llamada!: string;

    @Column({ type: "date" })
    fecha!: Date;

    @Column()
    hora!: string;

    @Column()
    duracion!: number;

    @Column()
    campana!: string;

    @Column()
    interno!: string;

    @Column()
    nodo!: string;

    @Column()
    @Index()
    cliente!: string;

    @Column()
    tipo_llamada!: string;

    @Column()
    agente!: string;

    @Column()
    numero_remoto!: string;

    @Column({ nullable: true })
    transcrito!: number;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;
}
