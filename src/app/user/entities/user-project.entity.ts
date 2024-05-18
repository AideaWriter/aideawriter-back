import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user_project')
export class UserProjectEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  uid: string;

  @Column()
  user_id: number;

  @Column()
  project_id: number;
}
