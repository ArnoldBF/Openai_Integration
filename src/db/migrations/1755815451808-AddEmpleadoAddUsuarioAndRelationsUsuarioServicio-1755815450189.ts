import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmpleadoAddUsuarioAndRelationsUsuarioServicio17558154501891755815451808 implements MigrationInterface {
    name = 'AddEmpleadoAddUsuarioAndRelationsUsuarioServicio17558154501891755815451808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "empleados" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(100) NOT NULL, "last_name" varchar(200) NOT NULL, "ci" varchar(15) NOT NULL, "email" varchar(150) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_db4eb1de8c8c1fd3bfa6c09e5da" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_544f85c3fa15be17192eb3ea283" DEFAULT getdate(), CONSTRAINT "PK_73a63a6fcb4266219be3eb0ce8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" int NOT NULL IDENTITY(1,1), "user_name" varchar(100) NOT NULL, "password" varchar(30) NOT NULL, "recovery_token" nvarchar(255), "created_at" datetime2 NOT NULL CONSTRAINT "DF_7003e73aa27b744ee2714d7fff4" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_c4def8db8274d736eb6cc6018ba" DEFAULT getdate(), "servicio_id" int, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_401a59802f5492fd1dde8457750" FOREIGN KEY ("servicio_id") REFERENCES "servicios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_401a59802f5492fd1dde8457750"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "empleados"`);
    }

}
