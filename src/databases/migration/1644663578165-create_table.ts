import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1644663578165 implements MigrationInterface {
    name = 'createTable1644663578165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`deleted_at\` timestamp(0) NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`deleted_at\` timestamp(0) NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_fae0bad5f06a58f3d2b68e37f11\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_fae0bad5f06a58f3d2b68e37f11\``);
        await queryRunner.query(`DROP TABLE \`article\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
