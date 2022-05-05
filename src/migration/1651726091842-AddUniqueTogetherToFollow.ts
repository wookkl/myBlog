import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUniqueTogetherToFollow1651726091842 implements MigrationInterface {
    name = 'AddUniqueTogetherToFollow1651726091842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6ec6bb6d8ebe68e701b3501023\` ON \`follow\` (\`userFromId\`, \`userToId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6ec6bb6d8ebe68e701b3501023\` ON \`follow\``);
    }

}
