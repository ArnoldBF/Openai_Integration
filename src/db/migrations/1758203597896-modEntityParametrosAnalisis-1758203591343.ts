import { MigrationInterface, QueryRunner } from "typeorm";

export class ModEntityParametrosAnalisis17582035913431758203597896 implements MigrationInterface {
    name = 'ModEntityParametrosAnalisis17582035913431758203597896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ALTER COLUMN "campo_2" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ALTER COLUMN "campo_3" varchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ALTER COLUMN "campo_3" varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parametros_analisis" ALTER COLUMN "campo_2" varchar(255) NOT NULL`);
    }

}
