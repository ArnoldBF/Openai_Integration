import { MigrationInterface, QueryRunner } from "typeorm";

export class CampoDescripcionTipoAnalisis1751301692842
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE tipo_analisis ADD description VARCHAR(255) NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE tipo_analisis DROP COLUMN description`
        );
    }
}
