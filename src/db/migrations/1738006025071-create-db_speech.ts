import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateDbSpeech1738006025071 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear tabla 'Cientes'
        await queryRunner.createTable(
            new Table({
                name: "clientes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
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
        // Crear tabla 'Servicios'

        await queryRunner.createTable(
            new Table({
                name: "servicios",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "cliente_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
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
        // Crear tabla 'claves_audios'
        await queryRunner.createTable(
            new Table({
                name: "claves_audios",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "clave",
                        type: "nvarchar",
                        isNullable: true,
                    },
                    {
                        name: "descripcion",
                        type: "nvarchar",
                        isNullable: true,
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

        // Crear tabla 'audios'
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
                        name: "servicio_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "file_name",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "transcrito",
                        type: "int",
                        default: 0,
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

        // Crear tabla 'audio_metadata'
        await queryRunner.createTable(
            new Table({
                name: "data_audios",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "audio_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "clave",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "valor",
                        type: "nvarchar",
                        isNullable: true,
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

        await queryRunner.createTable(
            new Table({
                name: "transcripciones",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "audio_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "file_name",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "transcripcion",
                        type: "text",
                        isNullable: true,
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

        await queryRunner.createTable(
            new Table({
                name: "tipo_analisis",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "int",
                        isNullable: false,
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
        await queryRunner.createTable(
            new Table({
                name: "prompts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "template",
                        type: "text",
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

        await queryRunner.createTable(
            new Table({
                name: "claves_analisis",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "clave",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "descripcion",
                        type: "text",
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

        await queryRunner.createTable(
            new Table({
                name: "data_analisis",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "analisis_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "clave_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "valor",
                        type: "text",
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

        await queryRunner.createTable(
            new Table({
                name: "analisis",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "tipo_analisis_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "prompt_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "transcripcion_id",
                        type: "int",
                        isNullable: false,
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

        // Crear clave foránea entre 'audios' y 'servicios'
        await queryRunner.createForeignKey(
            "audios",
            new TableForeignKey({
                columnNames: ["servicio_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "servicios",
                onDelete: "CASCADE",
            })
        );

        // Crear clave foránea entre 'servicios' y 'clientes'
        await queryRunner.createForeignKey(
            "servicios",
            new TableForeignKey({
                columnNames: ["cliente_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "clientes",
                onDelete: "CASCADE",
            })
        );

        // Crear clave foránea entre 'audio_metadata' y 'audios'
        await queryRunner.createForeignKey(
            "data_audios",
            new TableForeignKey({
                columnNames: ["audio_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "audios",
                onDelete: "CASCADE",
            })
        );

        // Crear clave foránea entre 'audio_metadata' y 'audios'
        await queryRunner.createForeignKey(
            "data_audios",
            new TableForeignKey({
                columnNames: ["clave_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "claves_audios",
                onDelete: "CASCADE",
            })
        );

        // Crear clave foránea entre 'transcripciones' y 'audios'

        await queryRunner.createForeignKey(
            "transcripciones",
            new TableForeignKey({
                columnNames: ["audio_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "audios",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "analisis",
            new TableForeignKey({
                columnNames: ["transcripcion_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "transcripciones",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "analisis",
            new TableForeignKey({
                columnNames: ["tipo_analisis_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "tipo_analisis",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "analisis",
            new TableForeignKey({
                columnNames: ["prompt_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "prompts",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "data_analisis",
            new TableForeignKey({
                columnNames: ["analisis_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "analisis",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "data_analisis",
            new TableForeignKey({
                columnNames: ["clave_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "claves_analisis",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar clave foránea en 'data_audios'
        const tableDataAudios = await queryRunner.getTable("data_audios");
        const foreignKeyDataAudios = tableDataAudios!.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("audio_id") !== -1
        );
        if (foreignKeyDataAudios) {
            await queryRunner.dropForeignKey(
                "data_audios",
                foreignKeyDataAudios
            );
        }

        // Eliminar clave foránea en 'transcripciones'
        const tableTranscripciones = await queryRunner.getTable(
            "transcripciones"
        );
        const foreignKeyTranscripciones =
            tableTranscripciones!.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("audio_id") !== -1
            );
        if (foreignKeyTranscripciones) {
            await queryRunner.dropForeignKey(
                "transcripciones",
                foreignKeyTranscripciones
            );
        }

        // Eliminar claves foráneas en otras tablas si es necesario (por ejemplo, 'servicios')
        const tableAudios = await queryRunner.getTable("audios");
        const foreignKeyAudios = tableAudios!.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("servicio_id") !== -1
        );
        if (foreignKeyAudios) {
            await queryRunner.dropForeignKey("audios", foreignKeyAudios);
        }

        const tableServicios = await queryRunner.getTable("servicios");
        const foreignKeyServicios = tableServicios!.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("cliente_id") !== -1
        );
        if (foreignKeyServicios) {
            await queryRunner.dropForeignKey("servicios", foreignKeyServicios);
        }

        const tablaDataAnalisis = await queryRunner.getTable("data_analisis");
        const fkDataAnalisis = tablaDataAnalisis!.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("analisis_id") !== -1
        );

        if (fkDataAnalisis) {
            await queryRunner.dropForeignKey("data_analisis", fkDataAnalisis);
        }

        const tablaDataAnalisisClave = await queryRunner.getTable(
            "data_analisis"
        );
        const fkDataAnalisisClave = tablaDataAnalisisClave!.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("clave_id") !== -1
        );

        if (fkDataAnalisisClave) {
            await queryRunner.dropForeignKey(
                "data_analisis",
                fkDataAnalisisClave
            );
        }

        const tablaAnalisis = await queryRunner.getTable("analisis");
        const fkAnalisisTranscripcion = tablaAnalisis!.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("transcripcion_id") !== -1
        );

        if (fkAnalisisTranscripcion) {
            await queryRunner.dropForeignKey(
                "analisis",
                fkAnalisisTranscripcion
            );
        }

        const fkAnalisisTipo = tablaAnalisis!.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("tipo_analisis_id") !== -1
        );

        if (fkAnalisisTipo) {
            await queryRunner.dropForeignKey("analisis", fkAnalisisTipo);
        }

        const fkAnalisisPrompt = tablaAnalisis!.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("prompt_id") !== -1
        );

        if (fkAnalisisPrompt) {
            await queryRunner.dropForeignKey("analisis", fkAnalisisPrompt);
        }

        // Eliminar tablas en orden inverso a su creación
        await queryRunner.dropTable("transcripciones");
        await queryRunner.dropTable("data_audios");
        await queryRunner.dropTable("audios");
        await queryRunner.dropTable("claves_audios");
        await queryRunner.dropTable("servicios");
        await queryRunner.dropTable("clientes");
        await queryRunner.dropTable("data_analisis");
        await queryRunner.dropTable("claves_analisis");
        await queryRunner.dropTable("analisis");
        await queryRunner.dropTable("tipo_analisis");
        await queryRunner.dropTable("prompts");
    }
}
