import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserTokenDelete1714024113761 implements MigrationInterface {
  name = 'UserTokenDelete1714024113761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'token');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn(
      {
        name: 'token',
        type: 'int',
        isNullable: true,
      }
    ));
  }

}
