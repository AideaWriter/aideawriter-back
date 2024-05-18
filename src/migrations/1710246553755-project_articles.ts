import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProjectArticles1710246553755 implements MigrationInterface {
  name = 'ProjectArticles1710246553755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_articles',
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
            name: 'project_id',
            type: 'int',
            isNullable: true
          },
          {
            name: 'article_id',
            type: 'int',
            isNullable: true,
          },
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project_articles');
  }

}
