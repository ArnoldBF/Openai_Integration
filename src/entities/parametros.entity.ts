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

    @Column({ nullable: false, type: "varchar", length: 255 })
    name!: string;

    @Column({ nullable: false, type: "varchar", length: 255 })
    campo_1!: string;
    @Column({ nullable: false, type: "varchar", length: 255 })
    campo_2!: string;
    @Column({ nullable: false, type: "varchar", length: 255 })
    campo_3!: string;
    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_4!: string;
    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_5!: string;
    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_6!: string;
    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_7!: string;
    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_8!: string;
    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_9!: string;
    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_10!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_11!: string;
    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_12!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_13!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_14!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_15!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_16!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_17!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_18!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_19!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_20!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_21!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_22!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_23!: string;

    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_24!: string;
    @Column({ nullable: true, type: "varchar", length: 255 })
    campo_25!: string;
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
