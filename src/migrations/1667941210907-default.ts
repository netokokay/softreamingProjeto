import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667941210907 implements MigrationInterface {
    name = 'default1667941210907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "admin" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "admin" SET DEFAULT '1'`);
    }

}
