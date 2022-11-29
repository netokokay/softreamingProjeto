import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669310312645 implements MigrationInterface {
    name = 'default1669310312645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "admin" integer NOT NULL DEFAULT '0'`);
    }

}
