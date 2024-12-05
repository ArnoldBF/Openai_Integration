import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAudios1732734072182 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "audios",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "id_llamada",
                        type: "varchar",
                    },
                    {
                        name: "fecha",
                        type: "date",
                    },
                    {
                        name: "hora",
                        type: "time",
                    },
                    {
                        name: "campana",
                        type: "varchar",
                    },
                    {
                        name: "duracion",
                        type: "int",
                    },
                    {
                        name: "nodo",
                        type: "varchar",
                    },

                    {
                        name: "interno",
                        type: "varchar",
                    },
                    {
                        name: "cliente",
                        type: "varchar",
                    },
                    {
                        name: "tipo_llamada",
                        type: "varchar",
                    },
                    {
                        name: "agente",
                        type: "varchar",
                    },
                    {
                        name: "numero_remoto",
                        type: "varchar",
                    },
                    {
                        name: "transcrito",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "datetime2",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "datetime2",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("audios");
    }
}
