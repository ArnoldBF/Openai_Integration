import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Prompt, TipoAnalisis, Analisis } from "./index";
@Entity("parametros_anlaisis")
export class Parametro {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime2", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;

    @ManyToOne(() => Prompt, (prompt) => prompt.parametros, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "prompt_id" })
    prompt!: Prompt;

    @ManyToOne(() => TipoAnalisis, (tipo) => tipo.parametro, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "prompt_id" })
    tipo!: TipoAnalisis;

    @OneToMany(() => Analisis, (analisis) => analisis.parametro, {
        onDelete: "CASCADE",
    })
    analisis!: Analisis[];
}
