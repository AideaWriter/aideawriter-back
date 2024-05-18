import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('project_articles')
export class ProjectArticlesEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  uid: string;

  @Column()
  project_id: number;

  @Column()
  article_id: number;
}
