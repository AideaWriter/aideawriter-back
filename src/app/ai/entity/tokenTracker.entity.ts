import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token_tracker')
export class TokenTrackerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_uid: string;

  @Column()
  token: number;
}
