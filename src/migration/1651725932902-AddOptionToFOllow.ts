import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOptionToFOllow1651725932902 implements MigrationInterface {
    name = 'AddOptionToFOllow1651725932902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_5816068f85bbf562226298b4c14\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_9df150aaae84a29c251f1e91b02\``);
        await queryRunner.query(`ALTER TABLE \`follow\` CHANGE \`userFromId\` \`userFromId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`follow\` CHANGE \`userToId\` \`userToId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_5816068f85bbf562226298b4c14\` FOREIGN KEY (\`userFromId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_9df150aaae84a29c251f1e91b02\` FOREIGN KEY (\`userToId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_9df150aaae84a29c251f1e91b02\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_5816068f85bbf562226298b4c14\``);
        await queryRunner.query(`ALTER TABLE \`follow\` CHANGE \`userToId\` \`userToId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`follow\` CHANGE \`userFromId\` \`userFromId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_9df150aaae84a29c251f1e91b02\` FOREIGN KEY (\`userToId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_5816068f85bbf562226298b4c14\` FOREIGN KEY (\`userFromId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
