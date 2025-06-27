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
@Entity("parametros_analisis")
export class Parametro {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    campo_1!: string;
    @Column({ nullable: false })
    campo_2!: string;
    @Column({ nullable: false })
    campo_3!: string;
    @Column({ nullable: true })
    campo_4!: string;
    @Column({ nullable: true })
    campo_5!: string;
    @Column({ nullable: true })
    campo_6!: string;
    @Column({ nullable: true })
    campo_7!: string;
    @Column({ nullable: true })
    campo_8!: string;
    @Column({ nullable: true })
    campo_9!: string;
    @Column({ nullable: true })
    campo_10!: string;

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
    @JoinColumn({ name: "tipo_analisis_id" })
    tipo!: TipoAnalisis;

    @OneToMany(() => Analisis, (analisis) => analisis.parametro, {
        onDelete: "CASCADE",
    })
    analisis!: Analisis[];
}
