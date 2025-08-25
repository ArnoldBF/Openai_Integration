import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPropiedadesEnParametrosAnalisis17558914466401755891447465 implements MigrationInterface {
    name = 'AddPropiedadesEnParametrosAnalisis17558914466401755891447465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_11" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_12" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_13" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_14" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_15" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_16" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_17" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_18" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_19" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_20" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_21" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_22" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_23" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_24" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ADD "campo_25" varchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_25"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_24"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_23"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_22"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_21"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_20"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_19"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_18"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_17"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_16"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_15"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_14"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_13"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_12"`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" DROP COLUMN "campo_11"`);
    }

}
