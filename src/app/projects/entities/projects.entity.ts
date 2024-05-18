import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class ProjectsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar' })
  uid: string;

  @Column()
  name: string;

}
