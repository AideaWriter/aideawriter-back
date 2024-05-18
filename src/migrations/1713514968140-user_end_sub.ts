import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserEndSub1713514968140 implements MigrationInterface {
  name = 'UserEndSub1713514968140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn(
      {
        name: 'end_sub',
        type: 'varchar',
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'end_sub');
  }

}
