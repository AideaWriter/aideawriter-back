import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class User1710245830332 implements MigrationInterface {
  name = 'User1710245830332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'uid',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'billing_status',
            type: 'varchar',
            isNullable: true,
            default: `'trialing'`,
          },
          {
            name: 'billing_subscription_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'billing_customer_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true,
            default: `'user'`,
          },
          {
            name: 'is_email_confirmed',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
        ]
      }),
      true,
    );
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'user-email-idx',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
