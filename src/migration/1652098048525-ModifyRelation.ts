import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyRelation1652098048525 implements MigrationInterface {
    name = 'ModifyRelation1652098048525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_d0418ddc42c5707dbc37b05bef9\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`blogId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`userId\` \`blogId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_d0418ddc42c5707dbc37b05bef9\` FOREIGN KEY (\`blogId\`) REFERENCES \`blog\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
