import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
export class ArticlesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uid: string;

  @Column()
  model: string;

  @Column()
  words: number;

  @Column('jsonb', {
    nullable: true,
    default: {
      'time': 1709114611185,
      'blocks': []
    }
  })
  text: string;

  @Column()
  maxTokens: number;

  @Column()
  theme: string;

  @Column()
  textFor: string;

  @Column('text', { array: true })
  titles: string[];

  @Column('text', { array: true })
  keyWords: string[];

  @Column({ type: 'numeric' })
  temperature: number;

  @Column()
  language: string;

  @Column()
  project_name: string;


  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;
}
