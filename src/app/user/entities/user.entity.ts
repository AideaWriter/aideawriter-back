import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
@Exclude()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  uid: string;

  @Index('user-email-idx', ['email'])
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 'trialing' })
  billing_status: string;

  @Column({ nullable: true })
  billing_subscription_id?: string;

  @Column({ nullable: true })
  billing_customer_id: string;

  @Column({ nullable: true })
  payment_method_id: string;

  @Column({ nullable: true })
  checkout_session_id: string;

  @Column({ nullable: true })
  start_sub: string;

  @Column({ nullable: true })
  end_sub: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: false })
  is_email_confirmed: boolean;


  @Column({ nullable: true, default: 3 })
  articles: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

}
