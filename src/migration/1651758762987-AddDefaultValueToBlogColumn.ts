import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultValueToBlogColumn1651758762987 implements MigrationInterface {
    name = 'AddDefaultValueToBlogColumn1651758762987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`total_visit_count\` \`total_visit_count\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`total_visit_count\` \`total_visit_count\` int NOT NULL`);
    }

}
