import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserTokenColumn1712906716733 implements MigrationInterface {
  name = 'UserTokenColumn1712906716733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn(
      {
        name: 'token',
        type: 'int',
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'token');
  }

}
