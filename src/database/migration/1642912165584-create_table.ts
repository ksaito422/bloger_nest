import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1642912165584 implements MigrationInterface {
    name = 'createTable1642912165584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`title\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title\``);
    }

}
