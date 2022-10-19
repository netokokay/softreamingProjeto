import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666113994040 implements MigrationInterface {
    name = 'default1666113994040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" ADD "description" text NOT NULL`);
    }

}
