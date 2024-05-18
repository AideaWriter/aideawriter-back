import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserCheckoutSessionId1713172099703 implements MigrationInterface {
  name = 'UserCheckoutSessionId1713172099703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn(
      {
        name: 'checkout_session_id',
        type: 'varchar',
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'checkout_session_id');
  }

}
