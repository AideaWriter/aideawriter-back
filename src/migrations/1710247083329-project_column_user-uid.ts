import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ProjectColumnUserUid1710247083329 implements MigrationInterface {
  name = 'ProjectColumnUserUid1710247083329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('projects', new TableColumn(
      {
        name: 'user',
        type: 'varchar',
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('projects', 'user');
  }

}
