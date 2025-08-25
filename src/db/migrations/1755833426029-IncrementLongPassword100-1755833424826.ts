import { MigrationInterface, QueryRunner } from "typeorm";

export class IncrementLongPassword10017558334248261755833426029 implements MigrationInterface {
    name = 'IncrementLongPassword10017558334248261755833426029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "password" varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "password" varchar(50) NOT NULL`);
    }

}
