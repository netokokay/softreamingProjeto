import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666111981607 implements MigrationInterface {
    name = 'default1666111981607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
