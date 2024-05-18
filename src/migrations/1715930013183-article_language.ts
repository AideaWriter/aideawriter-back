import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ArticleLanguage1715930013183 implements MigrationInterface {
  name = 'ArticleLanguage1715930013183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('articles', new TableColumn(
      {
        name: 'language',
        type: 'varchar',
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('articles', 'language');
  }

}
