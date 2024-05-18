import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserPaymetMethodColumn1712732429409 implements MigrationInterface {
  name = 'UserPaymetMethodColumn1712732429409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn(
      {
        name: 'payment_method_id',
        type: 'varchar',
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'payment_method_id');
  }

}
