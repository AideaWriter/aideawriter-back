import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Articles1710244890364 implements MigrationInterface {
  name = 'Articles1710244890364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles',
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
            name: 'model',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'words',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'maxTokens',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'textFor',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'temperature',
            type: 'decimal',
            precision: 1,
            scale: 1,
            isNullable: true
          },
          {
            name: 'theme',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'keyWords',
            type: 'varchar',
            isArray: true,
            isNullable: true,
          },
          {
            name: 'titles',
            type: 'varchar',
            isArray: true,
            isNullable: true,
          },
          {
            name: 'text',
            type: 'json',
            isNullable: true
          },
          {
            name: 'project_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'varchar',
            isNullable: true,
          },
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles');
  }

}
