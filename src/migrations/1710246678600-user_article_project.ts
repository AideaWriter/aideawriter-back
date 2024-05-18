import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserArticleProject1710246678600 implements MigrationInterface {
  name = 'UserArticleProject1710246678600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_articles',
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
            name: 'article_id',
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
    await queryRunner.dropTable('user_articles');
  }

}
