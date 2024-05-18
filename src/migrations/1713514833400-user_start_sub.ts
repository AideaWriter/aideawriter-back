import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserStartSub1713514833400 implements MigrationInterface {
  name = 'UserStartSub1713514833400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn(
      {
        name: 'start_sub',
        type: 'varchar',
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'start_sub');
  }

}
