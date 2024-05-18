import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ArticleAddTextColumnWithNewType1710484722693 implements MigrationInterface {
  name = 'ArticleAddTextColumnWithNewType1710484722693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('articles', new TableColumn(
      {
        name: 'text',
        type: 'jsonb',
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('articles', 'text');
  }

}
