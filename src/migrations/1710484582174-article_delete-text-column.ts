import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ArticleDeleteTextColumn1710484582174 implements MigrationInterface {
  name = 'ArticleDeleteTextColumn1710484582174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('articles', 'text');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('articles', new TableColumn(
      {
        name: 'text',
        type: 'json',
        isNullable: true,
      }
    ));
  }

}
