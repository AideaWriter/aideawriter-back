import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user_articles')
export class UserArticlesEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  uid: string;


  @Column()
  user_id: number;

  @Column()
  article_id: number;

  @Column()
  project_id: number;
}
