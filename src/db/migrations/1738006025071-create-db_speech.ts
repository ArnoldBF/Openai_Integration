import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
    TableIndex,
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
                        name: "clave_id",
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
                        name: "parametro_id",
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

        await queryRunner.createTable(
            new Table({
                name: "parametros_analisis",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "prompt_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "tipo_analisis_id",
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

        await queryRunner.createIndex(
            "clientes",
            new TableIndex({
                name: "IDX_CLIENTES_NAME",
                columnNames: ["name"],
            })
        );

        await queryRunner.createIndex(
            "servicios",
            new TableIndex({
                name: "IDX_SERVICIOS_NAME",
                columnNames: ["name"],
            })
        );

        await queryRunner.createIndex(
            "audios",
            new TableIndex({
                name: "IDX_AUDIOS_TRANSCRITO",
                columnNames: ["transcrito"],
            })
        );

        await queryRunner.createIndex(
            "data_audios",
            new TableIndex({
                name: "IDX_DATA_AUDIOS_COMPOSITE",
                columnNames: ["audio_id", "clave_id"],
            })
        );

        await queryRunner.createIndex(
            "analisis",
            new TableIndex({
                name: "IDX_ANALISIS_COMPOSITE",
                columnNames: ["parametro_id", "transcripcion_id"],
            })
        );

        await queryRunner.createIndex(
            "parametros_analisis",
            new TableIndex({
                name: "IDX_PARAMETROS_ANALISIS_COMPOSITE",
                columnNames: ["prompt_id", "tipo_analisis_id"],
            })
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
                columnNames: ["parametro_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "parametros_analisis",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "parametros_analisis",
            new TableForeignKey({
                columnNames: ["prompt_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "prompts",
                onDelete: "CASCADE",
            })
        );
        await queryRunner.createForeignKey(
            "parametros_analisis",
            new TableForeignKey({
                columnNames: ["tipo_analisis_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "tipo_analisis",
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
        // Eliminar claves foráneas primero
        await queryRunner.dropForeignKey(
            "data_analisis",
            "FK_data_analisis_clave_id"
        );
        await queryRunner.dropForeignKey(
            "data_analisis",
            "FK_data_analisis_analisis_id"
        );
        await queryRunner.dropForeignKey(
            "parametros_analisis",
            "FK_parametros_analisis_prompt_id"
        );
        await queryRunner.dropForeignKey(
            "parametros_analisis",
            "FK_parametros_analisis_tipo_analisis_id"
        );
        await queryRunner.dropForeignKey(
            "analisis",
            "FK_analisis_parametro_id"
        );
        await queryRunner.dropForeignKey(
            "analisis",
            "FK_analisis_transcripcion_id"
        );
        await queryRunner.dropForeignKey(
            "transcripciones",
            "FK_transcripciones_audio_id"
        );
        await queryRunner.dropForeignKey(
            "data_audios",
            "FK_data_audios_audio_id"
        );
        await queryRunner.dropForeignKey(
            "data_audios",
            "FK_data_audios_clave_id"
        );
        await queryRunner.dropForeignKey("audios", "FK_audios_servicio_id");
        await queryRunner.dropForeignKey(
            "servicios",
            "FK_servicios_cliente_id"
        );

        // Eliminar índices adicionales si es necesario (opcional, si los índices son específicos y no son automáticos)
        await queryRunner.dropIndex(
            "parametros_analisis",
            "IDX_PARAMETROS_ANALISIS_COMPOSITE"
        );
        await queryRunner.dropIndex("analisis", "IDX_ANALISIS_COMPOSITE");
        await queryRunner.dropIndex("data_audios", "IDX_DATA_AUDIOS_COMPOSITE");
        await queryRunner.dropIndex("audios", "IDX_AUDIOS_TRANSCRITO");
        await queryRunner.dropIndex("servicios", "IDX_SERVICIOS_NAME");
        await queryRunner.dropIndex("clientes", "IDX_CLIENTES_NAME");

        // Eliminar tablas en el orden correcto
        await queryRunner.dropTable("parametros_analisis");
        await queryRunner.dropTable("analisis");
        await queryRunner.dropTable("data_analisis");
        await queryRunner.dropTable("claves_analisis");
        await queryRunner.dropTable("prompts");
        await queryRunner.dropTable("tipo_analisis");
        await queryRunner.dropTable("transcripciones");
        await queryRunner.dropTable("data_audios");
        await queryRunner.dropTable("audios");
        await queryRunner.dropTable("claves_audios");
        await queryRunner.dropTable("servicios");
        await queryRunner.dropTable("clientes");
    }
}
