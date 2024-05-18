import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserProjects1710246462022 implements MigrationInterface {
  name = 'UserProjects1710246462022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_project',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'uid',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true
          },
          {
            name: 'project_id',
            type: 'int',
            isNullable: true,
          },
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_project');
  }

}
