import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePropiedadDescripcionTipoAnalisisPorText17558847902761755884791146 implements MigrationInterface {
    name = 'UpdatePropiedadDescripcionTipoAnalisisPorText17558847902761755884791146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_analisis" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tipo_analisis" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_analisis" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tipo_analisis" ADD "description" varchar(255)`);
    }

}
