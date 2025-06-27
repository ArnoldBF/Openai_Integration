import { MigrationInterface, QueryRunner } from "typeorm";

export class CampoNameParametro1750960194804 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE parametros_analisis ADD name VARCHAR(255) NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE parametros_analisis DROP COLUMN name`
        );
    }
}
