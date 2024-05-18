import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserArticlesColumn1714024363380 implements MigrationInterface {
  name = 'UserArticlesColumn1714024363380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn(
      {
        name: 'articles',
        type: 'int',
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'articles');
  }

}
