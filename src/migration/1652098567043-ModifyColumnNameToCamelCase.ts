import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyColumnNameToCamelCase1652098567043 implements MigrationInterface {
    name = 'ModifyColumnNameToCamelCase1652098567043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`total_visit_count\` \`totalVisitCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`is_private\` \`viewCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`is_removed\` \`isRemoved\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`view_count\` \`isPrivate\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`totalVisitCount\` \`total_visit_count\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`viewCount\` \`view_count\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`isRemoved\` \`is_removed\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`isPrivate\` \`is_private\` tinyint NOT NULL DEFAULT '0'`);
    }

}
