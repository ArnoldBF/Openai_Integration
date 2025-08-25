import { MigrationInterface, QueryRunner } from "typeorm";

export class IncrementLongPassword17558332496581755833250849 implements MigrationInterface {
    name = 'IncrementLongPassword17558332496581755833250849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "password" varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "password" varchar(30) NOT NULL`);
    }

}
