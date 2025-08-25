import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeyEmpleadoId17558158985571755815900461 implements MigrationInterface {
    name = 'AddForeignKeyEmpleadoId17558158985571755815900461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "empleado_id" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_a263b94b107a7aa7bb71f951c9" ON "usuarios" ("empleado_id") WHERE "empleado_id" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_a263b94b107a7aa7bb71f951c92" FOREIGN KEY ("empleado_id") REFERENCES "empleados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_a263b94b107a7aa7bb71f951c92"`);
        await queryRunner.query(`DROP INDEX "REL_a263b94b107a7aa7bb71f951c9" ON "usuarios"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "empleado_id"`);
    }

}
