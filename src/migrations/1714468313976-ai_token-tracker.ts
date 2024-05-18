import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AiTokenTracker1714468313976 implements MigrationInterface {
  name = 'AiTokenTracker1714468313976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'token_tracker',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'user_uid',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'token',
            type: 'int',
            isUnique: true,
          },
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('token_tracker');
  }

}
